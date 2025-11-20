import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductActions } from "@/components/product-actions";
import { SellerInfo } from "@/components/seller-info";
import { ProductTabs } from "@/components/product-tabs";
import { RelatedProducts } from "@/components/related-products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  // Fetch product details
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  console.log("Product query result:", { product, error, id });

  if (error || !product) {
    console.error("Product fetch error:", error);
    notFound();
  }

  // Fetch product images (assuming you have a product_images table)
  const { data: images } = await supabase
    .from("product_images")
    .select("image_url")
    .eq("product_id", id)
    .order("order", { ascending: true });

  // Fetch product variants (colors, sizes, etc.)
  const { data: variants } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", id);

  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select(
      `
      *,
      user:user_id (
        username,
        profile_picture
      )
    `
    )
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  // Mock seller data since we don't have sellers yet
  const mockSeller = {
    id: "1",
    username: "Butter Bear Shop",
    profile_picture: undefined,
    location: "Manila, Philippines",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left Column - Product Images */}
            <div>
              <ProductImageCarousel
                images={
                  images?.map((img) => img.image_url) || [product.product_img]
                }
                productName={product.product_name}
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {product.product_name}
                </h1>
                <p className="text-2xl font-bold text-primary">
                  ₱{product.product_price.toLocaleString()}
                </p>
              </div>

              <p className="text-muted-foreground">{product.product_desc}</p>

              {/* Product Actions (quantity, variants, add to cart, buy now) */}
              <ProductActions
                productId={product.id}
                variants={variants || []}
                price={product.product_price}
              />

              {/* Seller Info */}
              <SellerInfo seller={mockSeller} />
            </div>
          </div>

          {/* Tabs Section - Reviews, Description, Related Products */}
          <ProductTabs
            productId={product.id}
            fullDescription={product.full_description}
            reviews={reviews || []}
          />

          {/* Related Products */}
          <RelatedProducts
            currentProductId={product.id}
            category={product.category}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
