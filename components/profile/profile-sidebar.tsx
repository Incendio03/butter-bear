// components/profile/profile-sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Lock, Bell, HelpCircle } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  group: string;
}

const navItems: NavItem[] = [
  // Profile Group
  {
    group: "Profile",
    label: "Personal Information",
    href: "/customer/profile/personal-information",
    icon: <User className="h-4 w-4" />,
  },
  // Privacy Group
  {
    group: "Privacy",
    label: "Change Password",
    href: "/customer/profile/change-password",
    icon: <Lock className="h-4 w-4" />,
  },
  // General Group
  {
    group: "General",
    label: "Notifications",
    href: "/customer/profile/notifications",
    icon: <Bell className="h-4 w-4" />,
  },
  // Support Group
  {
    group: "Customer Support",
    label: "Customer Support",
    href: "/customer/profile/customer-support",
    icon: <HelpCircle className="h-4 w-4" />,
  },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const groups = Array.from(new Set(navItems.map((item) => item.group)));

  return (
    <aside className="w-full md:w-64 border-b md:border-r md:border-b-0">
      <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
        {groups.map((group) => (
          <div key={group} className="flex md:block">
            <div className="hidden md:block px-4 py-2 text-sm font-semibold text-muted-foreground">
              {group}
            </div>
            {navItems
              .filter((item) => item.group === group)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap md:whitespace-normal",
                    "hover:bg-accent hover:text-accent-foreground transition-colors",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  <span className="md:hidden">{item.label.split(" ")[0]}</span>
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
