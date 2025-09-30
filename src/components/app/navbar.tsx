"use client";

import Logo from "./logo";
import AppNavLinks from "./app-nav-links";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>

        <div className="flex-1 flex justify-center">
            <AppNavLinks />
        </div>

        <div className="flex items-center gap-2">
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
