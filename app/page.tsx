"use client";

import { useEffect, useState } from "react";
// Ensure this path is correct based on your file tree
import { fetchKnowledge, addKnowledge } from "../components/api/api";

// 1. Define the shape of your Knowledge data
interface KnowledgeItem {
  id?: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string;
  createdAt?: string;
}

export default function Home() {
  // 2. Add Type Generics to your state
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Load existing knowledge
  async function loadData(): Promise<void> {
    try {
      setLoading(true);
      setError("");
      const data = await fetchKnowledge();
      
      // Robust array extraction to prevent .map() or .filter() errors
      // Use type casting to tell TS we expect an array of KnowledgeItems
      const actualData: KnowledgeItem[] = Array.isArray(data) 
        ? data 
        : (data?.knowledge || data?.items || []);
      
      // SORT: Ensure newest are at the top (Stack behavior)
      setItems([...actualData].reverse());
    } catch (err) {
      console.error(err);
      setError("Failed to load knowledge data.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // 3. Type the Form Event
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const newItem = await addKnowledge({ title, content });

      if (newItem) {
        // Add to top of local state immediately
        setItems((prev) => [newItem, ...prev]);
        setTitle("");
        setContent("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add knowledge.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8 min-h-screen">
      <h1 className="text-3xl font-black tracking-tight dark:text-white">Second Brain</h1>

      {error && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-700">
        <input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="Title of your discovery..."
          className="w-full border dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="What did you learn today?"
          className="w-full border dark:border-gray-700 bg-white dark:bg-gray-900 p-3 rounded-xl min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-bold px-4 py-3 rounded-xl hover:bg-blue-700 transition disabled:bg-blue-300 shadow-lg shadow-blue-500/20"
        >
          {loading ? "Capturing..." : "Add to Brain"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Recent Knowledge</h2>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div
              key={item.id || index}
              className="border dark:border-gray-700 p-5 rounded-2xl shadow-sm bg-white dark:bg-gray-800 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="font-bold text-xl mb-2 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.summary || "No summary generated yet."}
              </p>
              {item.tags && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {item.tags.split(',').map((tag) => (
                    <span key={tag.trim()} className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded uppercase">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500 italic">Your brain is empty. Add some knowledge!</p>
        )}
      </div>
    </main>
  );
}