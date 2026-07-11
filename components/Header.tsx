import Link from "next/link";
import { Shield } from "lucide-react";

interface HeaderProps {
  active?: "home" | "demo" | "developers" | "research";
}

export function Header({ active }: HeaderProps) {
  const links = [
    { href: "/demo", label: "Live Demo", key: "demo" as const },
    { href: "/developers", label: "Developers", key: "developers" as const },
    { href: "/research", label: "Research", key: "research" as const },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-surface-900/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-paw-600/20 ring-1 ring-paw-500/30">
            <Shield className="h-5 w-5 text-paw-400" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Paw<span className="text-paw-400">Guard</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                active === link.key
                  ? "bg-paw-600/20 text-paw-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/demo"
          className="rounded-lg bg-paw-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-paw-500"
        >
          Try Demo
        </Link>
      </div>
    </header>
  );
}
