"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { LoadingState } from "../ui/loading-state";
import { createClient } from "@/utils/supabase/client";
import { getImageUrl } from "@/lib/image";
import {
  getCartItems,
  updateCartQuantity,
  removeFromCart,
  CartItem,
} from "@/lib/cart";

export function CartContent() {
  const supabase = createClient();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Load cart items on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data, error } = await getCartItems(supabase);

      if (error) {
        console.error("Error loading cart:", error);
        return;
      }

      // FIX: Actually set the data instead of empty array
      setCartItems(data && Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle individual item selection
  const toggleItemSelection = (itemId: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  // Toggle select all
  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)));
    }
  };

  // Update quantity
  const updateQuantity = async (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await handleRemoveItem(cartItemId);
      return;
    }

    try {
      setUpdating(true);
      const { error } = await updateCartQuantity(
        supabase,
        cartItemId,
        newQuantity
      );

      if (error) {
        return;
      }

      // Update local state
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdating(false);
    }
  };

  const updateVariant = async (
    cartItemId: string,
    color: string | null,
    size: string | null
  ) => {
    try {
      setUpdating(true);
      const { error } = await supabase
        .from("cart_items")
        .update({
          variant_color: color,
          variant_size: size,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cartItemId);

      if (error) {
        console.error("Error updating variant:", error);
        return;
      }

      // Update local state
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId
            ? { ...item, variant_color: color, variant_size: size }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating variant:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      setUpdating(true);
      const { error } = await removeFromCart(supabase, cartItemId);

      if (error) {
        return;
      }

      // Update local state
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));

      // Remove from selection
      const newSelected = new Set(selectedItems);
      newSelected.delete(cartItemId);
      setSelectedItems(newSelected);
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate total price for selected items
  const totalPrice = Array.from(selectedItems).reduce((sum, itemId) => {
    const item = cartItems.find((ci) => ci.id === itemId);
    return sum + (item ? item.product.product_price * item.quantity : 0);
  }, 0);

  const isAllSelected =
    cartItems.length > 0 && selectedItems.size === cartItems.length;

  if (loading) {
    return (
      <LoadingState
        message="Loading Cart"
        subtext="Fetching your shopping items..."
      />
    );
  }

  return (
    <>
      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/customer/dashboard">
              <Button>Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {/* Select All */}
                <div className="flex items-center gap-4 pb-6 border-b mb-6">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                  />
                  <label className="font-semibold text-primary-foreground cursor-pointer">
                    Select All Items ({cartItems.length})
                  </label>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b last:border-0"
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                        className="w-5 h-5 rounded border-gray-300 cursor-pointer mt-2"
                      />

                      {/* Product Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={getImageUrl(item.product.product_img, supabase)}
                          alt={item.product.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/customer/product/${item.product_id}`}>
                          <h3 className="font-semibold text-accent-foreground transition-colors">
                            {item.product.product_name}
                          </h3>
                        </Link>

                        {/* Variant Selector */}
                        {(item.product.product_variant_color?.length ?? 0) >
                          0 ||
                        (item.product.product_variant_size?.length ?? 0) > 0 ? (
                          <div className="mt-2 space-y-2">
                            {/* Color Variant */}
                            {(item.product.product_variant_color?.length ?? 0) >
                              0 && (
                              <select
                                value={item.variant_color || ""}
                                onChange={(e) =>
                                  updateVariant(
                                    item.id,
                                    e.target.value || null,
                                    item.variant_size
                                  )
                                }
                                disabled={updating}
                                className="text-sm text-muted-foreground border rounded border-muted-foreground px-2 py-1 bg-background cursor-pointer"
                              >
                                <option value="">Select Color</option>
                                {item.product.product_variant_color?.map(
                                  (color) => (
                                    <option key={color} value={color}>
                                      {color}
                                    </option>
                                  )
                                )}
                              </select>
                            )}

                            {/* Size Variant */}

                            {(item.product.product_variant_size?.length ?? 0) >
                              0 && (
                              <select
                                value={item.variant_size || ""}
                                onChange={(e) =>
                                  updateVariant(
                                    item.id,
                                    item.variant_color,
                                    e.target.value || null
                                  )
                                }
                                disabled={updating}
                                className="text-sm text-muted-foreground border rounded border-muted-foreground px-2 py-1 bg-background ml-2 cursor-pointer"
                              >
                                <option value="">Select Size</option>
                                {item.product.product_variant_size?.map(
                                  (size) => (
                                    <option key={size} value={size}>
                                      {size}
                                    </option>
                                  )
                                )}
                              </select>
                            )}

                            {/* Current Selection Display */}
                            {(item.variant_color || item.variant_size) && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {[item.variant_color, item.variant_size]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        ) : null}

                        <p className="text-primary font-bold mt-1">
                          ₱{item.product.product_price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 border rounded-lg p-1 bg-muted">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={updating}
                          className="text-muted-foreground p-1 hover:bg-background rounded transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-muted-foreground font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={updating}
                          className="text-muted-foreground p-1 hover:bg-background rounded transition-colors disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-24">
                        <p className="font-semibold text-accent">
                          ₱
                          {(
                            item.product.product_price * item.quantity
                          ).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={updating}
                        className="text-destructive hover:bg-destructive/30 bg-destructive/20 p-2 rounded transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl text-primary font-semibold mb-4">
                  Order Summary
                </h2>

                {/* Selected Items Count */}
                <div className="mb-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Selected Items:{" "}
                    <span className="font-semibold text-foreground">
                      {selectedItems.size}
                    </span>
                  </p>
                </div>

                {/* Total Price */}
                <div className="border-t border-b py-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium text-primary-foreground">
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium text-primary-foreground">
                      ₱0.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-medium text-primary-foreground">
                      ₱{(totalPrice * 0.12).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-primary-foreground font-semibold">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ₱{(totalPrice * 1.12).toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  disabled={selectedItems.size === 0 || updating}
                  className="w-full mb-3"
                  size="lg"
                >
                  Proceed to Checkout ({selectedItems.size})
                </Button>

                {/* Continue Shopping Button */}
                <Link href="/customer/dashboard">
                  <Button variant="outline3" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Empty Selection Warning */}
                {selectedItems.size === 0 && cartItems.length > 0 && (
                  <p className="text-sm text-amber-600 mt-4 text-center">
                    Please select items to checkout
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
