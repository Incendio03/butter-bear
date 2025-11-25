import React from "react";
import { createClient } from "@/utils/supabase/server";
import { ProductCard } from "@/components/products/product-card";
import { getImageUrl } from "@/lib/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

interface Product {
  id: string;
  product_name: string;
  product_price: number;
  product_img: string;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const supabase = await createClient();

  let products: Product[] = [];
  let error = null;

  if (query.trim()) {
    // Search products by name or description
    const { data, error: searchError } = await supabase
      .from("products")
      .select("id, product_name, product_price, product_img")
      .ilike("product_name", `%${query}%`); // Case-insensitive search

    products = data || [];
    error = searchError;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        {query && (
          <p className="text-muted-foreground">
            Showing results for:{" "}
            <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {/* No Query */}
      {!query.trim() && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">
            Enter a search term to find products
          </h2>
          <Button asChild>
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-16">
          <p className="text-destructive mb-4">
            Something went wrong. Please try again.
          </p>
          <Button asChild variant="outline">
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      )}

      {/* No Results */}
      {query.trim() && !error && products.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4 text-muted-foreground">
            No products found for "{query}"
          </h2>
          <p className="text-muted-foreground mb-6">
            Try different keywords or browse our categories
          </p>
          <Button asChild>
            <Link href="/">Browse All Products</Link>
          </Button>
        </div>
      )}

      {/* Search Results */}
      {query.trim() && !error && products.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Found {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
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
        </div>
      )}

      {/* Filters Section (Optional - for future) */}
      {products.length > 0 && (
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Refine Your Search</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Price: Low to High
            </Button>
            <Button variant="outline" size="sm">
              Price: High to Low
            </Button>
            <Button variant="outline" size="sm">
              Newest First
            </Button>
            <Button variant="outline" size="sm">
              Most Popular
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
