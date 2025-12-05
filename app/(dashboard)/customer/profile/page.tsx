// app/(dashboard)/customer/profile/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Lock, Bell, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Profile - Butter Bear",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  const sections = [
    {
      title: "Personal Information",
      description: "View and update your personal details",
      icon: User,
      href: "/customer/profile/personal-information",
    },
    {
      title: "Change Password",
      description: "Update your password for account security",
      icon: Lock,
      href: "/customer/profile/change-password",
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
      href: "/customer/profile/notifications",
    },
    {
      title: "Customer Support",
      description: "Get help and contact our support team",
      icon: HelpCircle,
      href: "/customer/profile/customer-support",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card
              key={section.href}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {section.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href={section.href}>
                  <Button variant="outline" className="w-full">
                    Go to {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
