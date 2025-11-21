import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getRoleBasedRedirect } from "@/lib/auth-utils";
import { canAccessAdminPanel, isVendorOrHigher } from "@/lib/roles";
import type { UserRole } from "@/lib/roles";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isVendorRoute = pathname.startsWith("/vendor");
  const isCustomerRoute = pathname.startsWith("/customer");

  // NEW: Home page redirect - authenticated users go to their dashboard
  if (pathname === "/" && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      const userRole = profile.role as UserRole;
      const redirectUrl = getRoleBasedRedirect(userRole);
      const url = request.nextUrl.clone();
      url.pathname = redirectUrl;
      return NextResponse.redirect(url);
    }
  }

  // Role-based route protection
  if (user && (isAdminRoute || isVendorRoute || isCustomerRoute)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      const userRole = profile.role as UserRole;

      // Check admin access
      if (isAdminRoute && !canAccessAdminPanel(userRole)) {
        const url = request.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }

      // Check vendor access
      if (isVendorRoute && !isVendorOrHigher(userRole)) {
        const url = request.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  }

  // Regular auth checks - redirect unauthenticated users
  if (
    !user &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/auth") &&
    pathname !== "/signup" &&
    pathname !== "/" &&
    !pathname.startsWith("/unauthorized")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
