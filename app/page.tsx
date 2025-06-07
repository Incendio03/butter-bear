import React from "react";
import Image from "next/image";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Home() {
 
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="bg-background flex-1">
        {/* Hero Advertisement Carousel */}
        <section className="w-full py-8">
          <div className="container mx-auto px-4">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/banner1.jpg"
                      alt="Summer Sale Banner"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center space-y-6 p-8 text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                          Summer Sale
                        </h1>
                        <p className="text-xl md:text-2xl">
                          Up to 70% off on selected items
                        </p>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                          Shop Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/banner2.jpg"
                      alt="New Arrivals Banner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center space-y-6 p-8 text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                          New Arrivals
                        </h1>
                        <p className="text-xl md:text-2xl">
                          Discover the latest trends
                        </p>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                          Explore Collection
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                
                <CarouselItem>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <Image
                      src="/images/banner3.jpg"
                      alt="Free Shipping Banner"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-center space-y-6 p-8 text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                          Free Shipping
                        </h1>
                        <p className="text-xl md:text-2xl">
                          On orders over $50
                        </p>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
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
      </main>
      
      <Footer/>
    </div>
  );
}