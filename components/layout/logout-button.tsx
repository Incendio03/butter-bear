"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/(auth)/actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  return (
    <DropdownMenuItem
      onClick={async () => {
        await logout();
      }}
      className="text-destructive cursor-pointer"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </DropdownMenuItem>
  );
}
