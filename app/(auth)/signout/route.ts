"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();

  // Sign out the user
  await supabase.auth.signOut();

  // Clear Next.js cache
  revalidatePath("/", "layout");

  // Redirect to homepage
  redirect("/");
}
