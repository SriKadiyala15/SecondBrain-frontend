"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
