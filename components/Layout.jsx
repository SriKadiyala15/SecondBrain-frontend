"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold hover:opacity-80 transition"
          >
              Second Brain
          </Link>

          {/* Navigation */}
          <nav className="flex gap-6 items-center">

            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>

            <Link href="/graph" className="hover:text-primary">
              Graph
            </Link>

            <Link href="/knowledge" className="hover:text-primary">
              Knowledge
            </Link>

            <ThemeToggle />

          </nav>

        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>

    </div>
  );
}
