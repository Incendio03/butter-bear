"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { getImageUrl } from "@/lib/image";

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImg: string;
  price: number;
  quantity: number;
}

export function CartContent() {
  const supabase = createClient();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      productId: "prod-1",
      productName: "Classic White T-Shirt",
      productImg: "products/sample_product1.jpg",
      price: 599,
      quantity: 2,
    },
    {
      id: "2",
      productId: "prod-2",
      productName: "Denim Blue Jeans",
      productImg: "products/sample_product2.jpg",
      price: 1299,
      quantity: 1,
    },
    {
      id: "3",
      productId: "prod-3",
      productName: "Black Leather Jacket",
      productImg: "products/sample_product3.jpg",
      price: 3499,
      quantity: 1,
    },
  ]);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

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
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
    const newSelected = new Set(selectedItems);
    newSelected.delete(itemId);
    setSelectedItems(newSelected);
  };

  // Calculate total price for selected items
  const totalPrice = Array.from(selectedItems).reduce((sum, itemId) => {
    const item = cartItems.find((ci) => ci.id === itemId);
    return sum + (item ? item.price * item.quantity : 0);
  }, 0);

  const isAllSelected =
    cartItems.length > 0 && selectedItems.size === cartItems.length;

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
                  <label className="font-semibold cursor-pointer">
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
                          src={getImageUrl(item.productImg, supabase)}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/customer/product/${item.productId}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors">
                            {item.productName}
                          </h3>
                        </Link>
                        <p className="text-primary font-bold mt-1">
                          ₱{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2 border rounded-lg p-1 bg-muted">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-background rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-24">
                        <p className="font-semibold">
                          ₱{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
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
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

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
                    <span className="font-semibold">
                      ₱{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-semibold">₱0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax:</span>
                    <span className="font-semibold">
                      ₱{(totalPrice * 0.12).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    ₱{(totalPrice * 1.12).toLocaleString()}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  disabled={selectedItems.size === 0}
                  className="w-full mb-3"
                  size="lg"
                >
                  Proceed to Checkout ({selectedItems.size})
                </Button>

                {/* Continue Shopping Button */}
                <Link href="/customer/dashboard">
                  <Button variant="outline" className="w-full">
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
