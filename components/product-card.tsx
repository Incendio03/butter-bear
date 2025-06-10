import React from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  imageAlt?: string
  className?: string
}

export function ProductCard({
  id,
  name,
  price,
  image,
  imageAlt,
  className,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(price)
  }

  return (
    <Card className={cn("w-60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2 p-0 m-3", className)}>
      <CardContent className="p-0">
        {/* Product Image - Expanded to occupy more space */}
        <div className="relative w-full h-56 bg-muted overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || name}
            fill
            className="object-cover"
            sizes="256px"
          />
        </div>

        {/* Product Details - Reduced padding for more image space */}
        <div className="p-3 space-y-2">
          {/* Product Name */}
          <div>
            <Label className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
              {name}
            </Label>
          </div>

          {/* Price and Add to Cart */}
          <div className="space-y-2">
            <div>
              <span className="text-lg font-bold text-primary">
                {formatPrice(price)}
              </span>
            </div>
            <Button
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Optional: Export a skeleton version for loading states
export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("w-64 overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="w-full h-52 bg-muted animate-pulse" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded" />
          <div className="space-y-2">
            <div className="h-6 w-20 bg-muted animate-pulse rounded" />
            <div className="h-8 w-full bg-muted animate-pulse rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}