"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
}

export function ProductImageCarousel({
  images,
  productName,
}: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  };

  // Update current slide when carousel changes
  if (api) {
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }

  // If no images or empty array, show placeholder
  const displayImages =
    images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="space-y-4">
      {/* Main Carousel */}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {displayImages.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="relative overflow-hidden">
                <div className="relative w-full h-[500px] bg-muted">
                  <Image
                    src={image || "/images/placeholder.jpg"}
                    alt={`${productName} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {displayImages.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      {/* Thumbnail Images */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {displayImages.map((image, index) => (
            <Card
              key={index}
              className={`relative h-20 cursor-pointer overflow-hidden transition-all ${
                index === current
                  ? "ring-2 ring-primary"
                  : "hover:ring-2 hover:ring-primary/50"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={image || "/images/placeholder.jpg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </Card>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {displayImages.length > 1 && (
        <div className="text-center text-sm text-muted-foreground">
          {current + 1} / {displayImages.length}
        </div>
      )}
    </div>
  );
}
