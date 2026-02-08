"use client";

import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 border rounded"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
