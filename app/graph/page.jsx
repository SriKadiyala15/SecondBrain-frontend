"use client";

import { useEffect, useState } from "react";

const API_URL = "https://secondbrain-backend-1-solb.onrender.com";

export default function GraphPage() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadGraph();
  }, []);

  function loadGraph() {
    setLoading(true);
    fetch(`${API_URL}/knowledge`)
      .then((res) => res.json())
      .then((data) => {
        const actualData = Array.isArray(data) ? data : (data.knowledge || data.items || []);
        
        // Grid logic to keep nodes organized within the frame
        const columns = 5; 
        const positioned = actualData
          .filter((note) => note && note.title)
          .map((note, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const jitterX = (Math.random() - 0.5) * 12; 
            const jitterY = (Math.random() - 0.5) * 12;

            return {
              ...note,
              x: (col * 18) + 12 + jitterX, 
              y: (row * 18) + 12 + jitterY, 
            };
          });

        setNodes(positioned);
      })
      .catch((err) => console.error("Error fetching graph:", err))
      .finally(() => setLoading(false));
  }

  return (
    /* ADJUSTED: Height set to calc(100vh - navbar_height) and overflow hidden */
    <div className="relative w-full h-[calc(100vh-64px)] bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-300">
      
      <button
        onClick={loadGraph}
        disabled={loading}
        className="z-50 absolute top-4 right-4 bg-white dark:bg-gray-800 border px-4 py-2 rounded shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        {loading ? "Refreshing..." : "Refresh Layout"}
      </button>

      {nodes.map((note) => (
        <div
          key={note.id || Math.random()}
          title={note.title}
          className="
            absolute
            w-14 h-14
            rounded-full
            flex items-center justify-center
            bg-blue-500
            text-white
            font-bold
            shadow-lg
            cursor-pointer
            hover:scale-110
            hover:z-40
            transition-all
          "
          style={{
            left: `${note.x}%`,
            top: `${note.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {note.title?.[0]?.toUpperCase() || "?"}
        </div>
      ))}

      {nodes.length === 0 && !loading && (
        <div className="flex h-full items-center justify-center text-gray-500">
          No knowledge nodes found.
        </div>
      )}
    </div>
  );
}