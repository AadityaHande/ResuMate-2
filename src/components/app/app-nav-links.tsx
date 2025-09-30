"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Home,
  LayoutTemplate,
  Pencil,
  FilePenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: <Home /> },
  { href: "/analyzer", label: "Analyzer", icon: <FileText /> },
  { href: "/cover-letter", label: "Cover Letter", icon: <FilePenLine /> },
  { href: "/templates", label: "Templates", icon: <LayoutTemplate /> },
  { href: "/editor", label: "Editor", icon: <Pencil /> },
];

export default function AppNavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {navLinks.map((link) => {
        const isActive =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative hidden h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:flex group",
              isActive ? "text-primary" : "text-foreground hover:text-primary"
            )}
          >
            {link.icon}
            <span className="relative py-1">
              {link.label}
              <span
                className={cn(
                  "absolute bottom-0 left-0 block h-0.5 w-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]",
                  "scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100",
                  isActive ? "scale-x-100" : ""
                )}
              />
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
