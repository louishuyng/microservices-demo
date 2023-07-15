import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link
        href="/services"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Services
      </Link>
      <Link
        href="/usecase"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Usecase
      </Link>
      <Link
        href="/actions"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Actions
      </Link>
      <Link
        href="/logging"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Logging
      </Link>
    </nav>
  );
}
