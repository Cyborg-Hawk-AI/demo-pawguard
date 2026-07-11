import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-800/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-200">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/demo" className="hover:text-paw-400 transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/developers" className="hover:text-paw-400 transition-colors">
                  Developer Docs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-200">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/research" className="hover:text-paw-400 transition-colors">
                  How we found this idea
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-200">PawGuard</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Local AI dog behavior detection for Home Assistant and Frigate power users.
              Zero cloud. Zero monthly fees for video storage.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-gray-600">
          © 2026 PawGuard · Self-hosted · Privacy-first · Built for homelab enthusiasts
        </div>
      </div>
    </footer>
  );
}
