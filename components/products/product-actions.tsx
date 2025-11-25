"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Variant {
  id: string;
  type: string; // 'color', 'size', etc.
  value: string;
  stock: number;
}

interface ProductActionsProps {
  productId: string;
  variants: Variant[];
  price: number;
}

export function ProductActions({
  productId,
  variants,
  price,
}: ProductActionsProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});

  const variantTypes = [...new Set(variants.map((v) => v.type))];

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = async () => {
    // TODO: Implement add to cart logic
    console.log("Add to cart", { productId, quantity, selectedVariants });
  };

  const handleBuyNow = async () => {
    // TODO: Implement buy now logic
    console.log("Buy now", { productId, quantity, selectedVariants });
    router.push("/checkout");
  };

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      {variantTypes.map((type) => (
        <div key={type} className="space-y-2">
          <Label className="text-sm font-medium capitalize">{type}</Label>
          <div className="flex flex-wrap gap-2">
            {variants
              .filter((v) => v.type === type)
              .map((variant) => (
                <Button
                  key={variant.id}
                  variant={
                    selectedVariants[type] === variant.value
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedVariants((prev) => ({
                      ...prev,
                      [type]: variant.value,
                    }))
                  }
                >
                  {variant.value}
                </Button>
              ))}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Quantity</Label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-20 text-center"
            min="1"
          />
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Total Price */}
      <div className="text-lg font-semibold">
        Total: ₱{(price * quantity).toLocaleString()}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        <Button size="lg" className="flex-1" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
