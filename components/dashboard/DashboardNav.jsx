"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/users", label: "Users" },
];

export default function DashboardNav({ user }) {
  const pathname = usePathname();

  return (
    <nav className="md:w-64 md:shrink-0 border-b md:border-b-0 md:border-r border-kavya-line md:min-h-screen">
      <div className="wrap md:px-6 py-6 flex md:flex-col gap-6 md:gap-10 items-center md:items-stretch justify-between md:justify-start">
        <Link href="/" className="font-serif font-semibold text-lg tracking-tight">
          Kavya Labs
        </Link>

        <ul className="hidden md:flex flex-col gap-1 list-none m-0 p-0 flex-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded px-3 py-2 text-[0.95rem] transition-colors ${
                    active
                      ? "bg-kavya-panel text-kavya-fg"
                      : "text-kavya-muted hover:text-kavya-fg"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3 pt-4 border-t border-kavya-line">
          {user?.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
          )}
          <div className="flex-1 min-w-0">
            <div className="text-sm truncate">{user?.name}</div>
            <div className="text-xs text-kavya-muted truncate">{user?.email}</div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hidden md:block text-left text-sm text-kavya-muted hover:text-kavya-fg transition-colors"
        >
          Sign out
        </button>

        {/* Mobile: compact row */}
        <div className="flex md:hidden items-center gap-4">
          <ul className="flex gap-4 list-none m-0 p-0">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm ${
                    pathname === link.href ? "text-kavya-fg" : "text-kavya-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-kavya-muted hover:text-kavya-fg"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}
