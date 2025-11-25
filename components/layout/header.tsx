import React from "react";
import { Search, User, ShoppingCart, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { SearchBar } from "../forms/search-form";

export default async function Header() {
  // Check if user is authenticated
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get user profile if authenticated
  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("role, email")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  const logoHref = user
    ? profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "vendor"
      ? "/vendor/dashboard"
      : "/customer/dashboard"
    : "/";

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top section with branding, search, and auth buttons */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Branding */}
          <Link href={logoHref} className="hover:opacity-80 transition-opacity">
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-foreground">
                Butter <span className="text-primary">Bear</span>
              </h3>
            </div>
          </Link>

          <SearchBar />

          {/* Right: Conditional rendering based on auth */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-primary-foreground hover:bg-primary cursor-pointer"
              size="icon"
              asChild
            >
              <Link href="/customer/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>

            {user ? (
              // User is logged in - show profile and logout
              <>
                <Button
                  variant="ghost"
                  className="text-foreground hover:bg-primary/10"
                  asChild
                >
                  <Link
                    href={
                      profile?.role === "admin"
                        ? "/admin/dashboard"
                        : profile?.role === "vendor"
                        ? "/vendor/dashboard"
                        : "/customer/dashboard"
                    }
                  >
                    <User className="h-5 w-5 mr-2" />
                    {profile?.email || user.email}
                  </Link>
                </Button>

                <form action={logout}>
                  <Button
                    type="submit"
                    variant="outline"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              // User is NOT logged in - show login/signup
              <>
                <Button
                  variant="outline2"
                  className="bg-primary text-primary-foreground hover:bg-primary/80"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/80"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
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
                          Premium styles made for confidence, comfort, and
                          everyday wear.
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
                          Elegant and bold pieces designed to elevate your
                          style.
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
                          Inclusive fashion that blends comfort, style, and
                          versatility.
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
  );
}
