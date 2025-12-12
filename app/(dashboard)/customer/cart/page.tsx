import { CartContent } from "@/components/cart/cart-contents";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-primary font-bold mb-8">
            Shopping Cart
          </h1>
          <CartContent />
        </div>
      </main>
    </div>
  );
}
