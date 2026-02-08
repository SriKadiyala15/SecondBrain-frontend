"use client";

import { useEffect, useState } from "react";

const API_URL = "https://secondbrain-backend-2mei.onrender.com";

export default function KnowledgePage() {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/knowledge`)
      .then((res) => res.json())
      .then((data) => {
        const actualData = Array.isArray(data)
          ? data
          : data.knowledge || data.items || [];

        // Frontend stack fix: Shows the latest notes at the top
        const stackSorted = Array.isArray(actualData)
          ? [...actualData].reverse()
          : [];

        setNotes(stackSorted);

        if (stackSorted.length > 0) {
          setSelected(stackSorted[0]);
        }
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)] text-gray-500 font-medium">
        Loading your brain...
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-80 border-r dark:border-gray-700 overflow-y-auto bg-gray-50/50 dark:bg-gray-800/30">
        <div className="p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
          <h2 className="font-bold text-lg flex items-center justify-between">
            Your Notes
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              Stack: Newest
            </span>
          </h2>
        </div>

        <div className="p-2 space-y-1">
          {notes.map((note, index) => (
            <div
              key={note.id || index}
              onClick={() => setSelected(note)}
              className={`p-4 cursor-pointer rounded-xl transition-all relative group ${
                selected?.id === note.id
                  ? "bg-blue-600 text-white shadow-lg translate-x-1"
                  : "hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {index === 0 && (
                <span
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                    selected?.id === note.id ? "bg-white" : "bg-blue-500"
                  } animate-pulse`}
                />
              )}

              <p className="font-bold truncate pr-4">
                {note.title || "Untitled Note"}
              </p>

              <div className="flex items-center gap-2 mt-1 opacity-70">
                <span className="material-symbols-outlined text-[14px]">
                  calendar_today
                </span>
                <p className="text-[11px]">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString()
                    : "Just now"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Content Area */}
      <section className="flex-1 p-12 overflow-y-auto">
        {selected ? (
          <div className="max-w-3xl mx-auto">
            <header className="mb-10">
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-sm">history</span>
                Saved on{" "}
                {new Date(selected.createdAt || Date.now()).toLocaleString()}
              </div>

              <h1 className="text-5xl font-black tracking-tight dark:text-white leading-tight">
                {selected.title}
              </h1>
            </header>

            <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="whitespace-pre-wrap leading-relaxed">
                {selected.content}
              </p>
            </article>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-blue-600">
                  auto_awesome
                </span>
                <h3 className="font-bold text-blue-900 dark:text-blue-300 uppercase text-xs tracking-widest">
                  AI Insight Summary
                </h3>
              </div>

              <p className="text-blue-900/80 dark:text-blue-100/80 text-lg italic font-medium leading-relaxed">
                {selected.summary || "Summary is being processed..."}
              </p>

              <div className="mt-6 pt-6 border-t border-blue-200/50 dark:border-blue-800/50 flex flex-wrap gap-2">
                {selected.tags?.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white dark:bg-blue-800/40 text-blue-600 dark:text-blue-300 rounded-full text-xs font-bold shadow-sm border border-blue-100 dark:border-blue-700"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-300">
            Select a note to view the stack details.
          </div>
        )}
      </section>
    </div>
  );
}