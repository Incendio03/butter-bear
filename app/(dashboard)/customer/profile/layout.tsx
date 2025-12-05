import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import React from "react";

export const metadata = {
  title: "Profile",
  description: "Manage you profile settings",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row">
        <ProfileSidebar />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
