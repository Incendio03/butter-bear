"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(
      "/login?message=Login failed: " + encodeURIComponent(error.message)
    );
  }

  // Get user profile to determine redirect
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile) {
      const redirectPath = getRoleBasedRedirect(profile.role as UserRole);
      revalidatePath("/", "layout");
      redirect(redirectPath);
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
