"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getRoleBasedRedirect } from "@/lib/auth-utils";
import type { UserRole } from "@/lib/roles";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input
  if (!data.email || !data.password) {
    return {
      success: false,
      error: "Email and Password are required",
    };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }

  // Get user profile to determine redirect
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let defaultRedirect = "/customer/dashboard";

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      defaultRedirect = getRoleBasedRedirect(profile.role as UserRole);
    }
  }

  revalidatePath("/", "layout");

  return {
    success: true,
    defaultRedirect,
  };
}
