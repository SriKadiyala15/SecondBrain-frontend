"use client";

import { useState } from "react";

// Backend URL added here
const API_URL = "https://secondbrain-backend-2mei.onrender.com";

export default function Dashboard() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    setIsSubmitting(true);
    console.log("Connecting to:", API_URL);

    try {
      const response = await fetch(`${API_URL}/knowledge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        alert("Knowledge captured successfully!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server Error:", errorData);
        alert("Failed to save. Please try again.");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Error connecting to server. Your backend might be waking up.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">

      <main className="max-w-5xl mx-auto px-4 py-8">

        {/* Capture Section */}
        <section className="mb-12">

          {/* FORM ADDED HERE */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#191e33] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-6"
          >

            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary">
                edit_square
              </span>
              <h2 className="text-lg font-semibold">
                Capture New Knowledge
              </h2>
            </div>

            <div className="space-y-4">

              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-[#323b67] rounded-lg py-3 px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              />

              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-[#323b67] rounded-lg py-3 px-4 min-h-[140px] focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
              />

            </div>

            {/* IMPORTANT: type="submit" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg transition-opacity ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            >
              {isSubmitting ? "Saving..." : "Add Knowledge"}
            </button>

          </form>

        </section>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Card
            title="Neural Networks 101"
            text="Artificial neural networks are inspired by biological brains."
          />

          <Card
            title="Sodium Bicarbonate"
            text="A chemical compound commonly known as baking soda."
          />

          <Card
            title="Marketing Strategy Q4"
            text="Focus on omnichannel influencer campaigns."
          />

        </div>

      </main>

    </div>
  );
}

function Card({ title, text }) {
  return (
    <article className="bg-white dark:bg-[#191e33] border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/50 transition-all">

      <h4 className="text-lg font-bold mb-2">{title}</h4>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        {text}
      </p>

    </article>
  );
}