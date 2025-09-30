"use client";

import { cn } from "@/lib/utils";

const Logo = () => {
  return (
    <div className={cn("flex items-center gap-2")}>
      <svg
        role="img"
        aria-label="ResuMate Logo"
        className="h-8 w-8 text-primary"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2H6ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H12V17H8V15Z"
          fillOpacity="0.3"
        />
        <path
          d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H10V2H6Z"
          fill="currentColor"
        />
      </svg>

      <h1 className={cn("text-2xl font-bold text-primary tracking-tight")}>
        Resu<span className="text-foreground">Mate</span>
      </h1>
    </div>
  );
};

export default Logo;
