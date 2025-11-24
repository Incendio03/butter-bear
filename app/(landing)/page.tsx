import React from "react";
import { getImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCard } from "@/components/product-card";
import { createClient } from "@/utils/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();

  // Fetch featured products
  const { data: products, error } = await supabase
    .from("products")
    .select("id, product_name, product_price, product_img")
    .limit(10);

  return (
    <>
      {/* Hero Advertisement Carousel */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary/60">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8 text-white">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Summer Sale
                      </h1>
                      <p className="text-xl md:text-2xl">
                        Up to 70% off on selected items
                      </p>
                      <Button className="bg-white text-primary hover:bg-white/90">
                        Shop Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8 text-white">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        New Arrivals
                      </h1>
                      <p className="text-xl md:text-2xl">
                        Discover the latest trends
                      </p>
                      <Button className="bg-white text-purple-600 hover:bg-white/90">
                        Explore Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem>
                <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8 text-white">
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Free Shipping
                      </h1>
                      <p className="text-xl md:text-2xl">
                        On orders over ₱1,000
                      </p>
                      <Button className="bg-white text-blue-600 hover:bg-white/90">
                        Start Shopping
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Featured Products
          </h2>

          {error && (
            <div className="text-center py-8 text-destructive">
              Error loading products. Please try again later.
            </div>
          )}

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          ) : (
            !error && (
              <div className="text-center py-8 text-muted-foreground">
                No products available at the moment.
              </div>
            )
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-3xl font-bold text-white">Men</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-3xl font-bold text-white">Women</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-3xl font-bold text-white">Unisex</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
