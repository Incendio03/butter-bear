import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default async function Home() {
 
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/* Your landing page content will go here */}
      </main>
      
      <Footer/>
    </div>
  );
}