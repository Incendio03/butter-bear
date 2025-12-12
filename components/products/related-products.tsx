import { createClient } from "@/utils/supabase/server";
import { ProductCard } from "@/components/products/product-card";
import { getImageUrl } from "@/lib/image";

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
}

export async function RelatedProducts({
  currentProductId,
  category,
}: RelatedProductsProps) {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, product_name, product_price, product_img")
    .neq("id", currentProductId)
    .limit(5);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl text-primary font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.product_name}
            price={product.product_price}
            image={getImageUrl(product.product_img, supabase)}
          />
        ))}
      </div>
    </section>
  );
}
