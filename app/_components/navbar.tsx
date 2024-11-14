"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  // Hooks
  const pathname = usePathname();

  // Renders
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image
          src="/images/logo.svg"
          alt="Finan Control"
          width={173}
          height={39}
        />

        <div className="mt-5 flex items-center gap-10">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathname === "/transactions"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Transactions
          </Link>
          {/* <Link
            href="/subscription"
            className={
              pathname === "/subscription"
                ? "font-bold text-primary"
                : "text-muted-foreground"
            }
          >
            Subscription
          </Link> */}
        </div>
      </div>
      <UserButton showName />
    </nav>
  );
}
