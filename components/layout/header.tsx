import React from 'react'
import { Search, User, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'



export default function Header() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top section with branding, search, and auth buttons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Branding */}
          <div className="flex items-center">
            <h3 className="text-xl font-bold text-foreground">
              Butter <span className="text-primary">Bear</span>
            </h3>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-3xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4 w-full focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Right: Login/Signup and Cart */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className=" text-primary-foreground hover:bg-primary cursor-pointer" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline2" className="bg-primary text-primary-foreground hover:bg-primary/80" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/80" asChild>
              <a href="/signup">Sign Up</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom section with navigation menu */}
      <div className="">
        <div className="container mx-auto px-4 py-2">
          <NavigationMenu className="mx-auto">
            <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Featured Products for Him
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Premium styles made for confidence, comfort, and everyday wear.
                        </p>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink href="/" title="Tops">
                      Tops
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Bottoms">
                      Bottoms
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Footwear">
                      Footwear
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Featured Products for Her
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Elegant and bold pieces designed to elevate your style.
                        </p>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink href="/" title="Tops">
                      Tops
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Bottoms">
                      Bottoms
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Footwear">
                      Footwear
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Unisex</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <div className="row-span-3">
                      <NavigationMenuLink
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Featured Unisex Picks
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Inclusive fashion that blends comfort, style, and versatility.
                        </p>
                      </NavigationMenuLink>
                    </div>
                    <NavigationMenuLink href="/" title="Tops">
                      Tops
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Bottoms">
                      Bottoms
                    </NavigationMenuLink>
                    <NavigationMenuLink href="/" title="Footwear">
                      Footwear
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  )
}