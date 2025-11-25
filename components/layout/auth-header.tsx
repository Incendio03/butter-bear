import React from "react";
import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h3 className="text-2xl font-bold text-foreground">
              Butter <span className="text-primary">Bear</span>
            </h3>
          </Link>
        </div>
      </div>
    </header>
  );
}
