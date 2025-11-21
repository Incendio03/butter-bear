import { SupabaseClient } from "@supabase/supabase-js";

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    product_name: string;
    product_price: number;
    product_img: string;
  };
}

export async function getCartItems(
  supabase: SupabaseClient
): Promise<{ data: CartItem[] | null; error: any }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: [], error: null };
  }

  const response = await supabase
    .from("cart_items")
    .select(
      `
      id,
      user_id,
      product_id,
      quantity,
      products(
        id,
        product_name,
        product_price,
        product_img
      )
    `
    )
    .eq("user_id", user.id);

  if (response.error) {
    return { data: null, error: response.error };
  }

  const items = (response.data || []).map((item: any) => ({
    id: item.id,
    user_id: item.user_id,
    product_id: item.product_id,
    quantity: item.quantity,
    product: Array.isArray(item.products) ? item.products[0] : item.products,
  })) as CartItem[];

  return { data: items, error: null };
}

export async function addToCart(
  supabase: SupabaseClient,
  productId: string,
  quantity: number = 1
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

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
