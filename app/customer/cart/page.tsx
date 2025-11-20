import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CartContent } from "@/components/cart-contents";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <CartContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
