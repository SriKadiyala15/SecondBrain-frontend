"use client";

import { useState } from "react";

const API_URL = "https://secondbrain-backend-1-solb.onrender.com";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/knowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        // Clear form on success
        setTitle("");
        setContent("");
        alert("Knowledge captured successfully!");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error saving knowledge.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    /* Aligns the dashboard perfectly below the navbar */
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-[calc(100vh-64px)]">
      <main className="max-w-5xl mx-auto px-6 py-10">
        
        {/* Capture Section */}
        <section className="mb-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#191e33] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-8 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <span className="material-symbols-outlined text-blue-500 block">
                  edit_square
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                Capture New Knowledge
              </h2>
            </div>

            <div className="space-y-5">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a descriptive title..."
                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-[#323b67] rounded-xl py-3.5 px-5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
              />

              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Expand your thoughts here..."
                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-[#323b67] rounded-xl py-3.5 px-5 min-h-[160px] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-lg transition-all active:scale-95 ${
                isSubmitting 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubmitting ? "Saving to Brain..." : "Add Knowledge"}
            </button>
          </form>
        </section>

        {/* Stats / Quick Info Header */}
        <div className="flex items-baseline justify-between mb-6">
          <h3 className="text-lg font-semibold opacity-80">Recent Entries</h3>
          <span className="text-sm text-blue-500 hover:underline cursor-pointer">View All</span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Neural Networks 101"
            text="Artificial neural networks are inspired by biological brains and form the core of modern AI."
            category="AI & Tech"
          />

          <Card
            title="Sodium Bicarbonate"
            text="A chemical compound commonly known as baking soda, used in cooking and neutralizing acids."
            category="Science"
          />

          <Card
            title="Marketing Strategy Q4"
            text="Focus on omnichannel influencer campaigns and community-led growth initiatives."
            category="Business"
          />
        </div>
      </main>
    </div>
  );
}

function Card({ title, text, category }) {
  return (
    <article className="group bg-white dark:bg-[#191e33] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-lg transition-all cursor-default">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
          {category}
        </span>
      </div>
      <h4 className="text-lg font-bold mb-3 group-hover:text-blue-500 transition-colors">
        {title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
        {text}
      </p>
    </article>
  );
}