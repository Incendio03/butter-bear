import { SupabaseClient } from "@supabase/supabase-js";
import { id } from "date-fns/locale";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  variant_color: string | null;
  variant_size: string | null;
  product: {
    id: string;
    product_name: string;
    product_price: number;
    product_img: string;
    product_variant_color?: string[];
    product_variant_size?: string[];
  };
}

export async function getCartItems(
  supabase: SupabaseClient
): Promise<{ data: CartItem[] | null; error: any }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: new Error("Not authenticated") };
  }

  const response = await supabase
    .from("cart_items")
    .select(
      `
      id,
      user_id,
      product_id,
      quantity,
      variant_color,
      variant_size,
      products(
        id,
        product_name,
        product_price,
        product_img
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (response.error) {
    return { data: null, error: response.error };
  }

  if (!response.data || response.data.length === 0) {
    return { data: [], error: null };
  }

  // Get variants for all products
  const productIds = response.data.map((item: any) => item.product_id);
  const { data: variants } = await supabase
    .from("product_variants")
    .select("product_id, type, value")
    .in("product_id", productIds);

  // Group variants by product_id
  const variantsByProduct: Record<
    string,
    { colors: string[]; sizes: string[] }
  > = {};
  variants?.forEach((variant: any) => {
    if (!variantsByProduct[variant.product_id]) {
      variantsByProduct[variant.product_id] = { colors: [], sizes: [] };
    }
    if (variant.type === "color") {
      variantsByProduct[variant.product_id].colors.push(variant.value);
    } else if (variant.type === "size") {
      variantsByProduct[variant.product_id].sizes.push(variant.value);
    }
  });

  const items = response.data.map((item: any) => {
    const product = Array.isArray(item.products)
      ? item.products[0]
      : item.products;
    const productVariants = variantsByProduct[item.product_id] || {
      colors: [],
      sizes: [],
    };

    return {
      id: item.id,
      user_id: item.user_id,
      product_id: item.product_id,
      quantity: item.quantity,
      variant_color: item.variant_color,
      variant_size: item.variant_size,
      product: {
        ...product,
        product_variant_color: productVariants.colors,
        product_variant_size: productVariants.sizes,
      },
    };
  }) as CartItem[];

  return { data: items, error: null };
}

export async function addToCart(
  supabase: SupabaseClient,
  productId: string,
  quantity: number = 1,
  variantColor?: string | null,
  variantSize?: string | null
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  // Check if item with same variant exists
  let query = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (variantColor) {
    query = query.eq("variant_color", variantColor);
  } else {
    query = query.is("variant_color", null);
  }

  if (variantSize) {
    query = query.eq("variant_size", variantSize);
  } else {
    query = query.is("variant_size", null);
  }

  const { data: existingItem } = await query.single();

  if (existingItem) {
    return await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + quantity })
      .eq("id", existingItem.id);
  }

  return await supabase.from("cart_items").insert({
    user_id: user.id,
    product_id: productId,
    quantity,
    variant_color: variantColor || null,
    variant_size: variantSize || null,
  });
}

export async function updateCartQuantity(
  supabase: SupabaseClient,
  cartItemId: string,
  quantity: number
) {
  if (quantity < 1) {
    return removeFromCart(supabase, cartItemId);
  }

  return await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId);
}

export async function removeFromCart(
  supabase: SupabaseClient,
  cartItemId: string
) {
  return await supabase.from("cart_items").delete().eq("id", cartItemId);
}

export async function clearCart(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  return await supabase.from("cart_items").delete().eq("user_id", user.id);
}
