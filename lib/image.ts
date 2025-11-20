import { SupabaseClient } from "@supabase/supabase-js";

export function getImageUrl(
  imagePath: string | null,
  supabase: SupabaseClient
): string {
  if (!imagePath) {
    return "/images/placeholder.jpg";
  }

  // If already a full URL, return as-is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Generate public URL from storage path
  const [bucket, ...pathParts] = imagePath.split("/");
  const filePath = pathParts.join("/");

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
}
