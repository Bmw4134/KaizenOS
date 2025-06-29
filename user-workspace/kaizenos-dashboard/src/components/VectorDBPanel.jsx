import React, { useState } from 'react';
import { motion } from 'framer-motion';
import useVectorDB from '../vector_db';

const VectorDBPanel = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const { similaritySearch } = useVectorDB();

  const handleSearch = () => {
    if (!query.trim()) return;
    const searchResults = similaritySearch(query);
    // Map results to display format
    const formattedResults = searchResults.map((res) => ({
      id: res.id,
      text: `Result for "${query}" #${res.id}`,
      score: res.score.toFixed(2),
    }));
    setResults(formattedResults);
    setHistory([query, ...history]);
    setQuery('');
  };

  return (
    <motion.div
      className="p-6 bg-[#0F1117] rounded-2xl shadow-xl backdrop-blur-md max-w-md mx-auto text-[#E5E7EB]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-[#38BDF8]">Vector DB Browser</h2>
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter vector search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-600 rounded-2xl px-4 py-3 bg-[#1E2128] text-[#F9FAFB] placeholder-[#A78BFA] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
        />
        <button
          onClick={handleSearch}
          className="bg-[#38BDF8] text-[#0F1117] px-6 py-3 rounded-2xl font-semibold hover:bg-[#22A7F0] transition"
        >
          Search
        </button>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-[#A78BFA]">Results:</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {results.map((res) => (
              <li
                key={res.id}
                className="bg-[#1E2128] p-3 rounded-2xl border border-gray-700 font-mono"
              >
                {res.text} (Score: {res.score})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-[#A78BFA]">Query History:</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No previous queries.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2">
            {history.map((q, idx) => (
              <li
                key={idx}
                className="bg-[#1E2128] p-3 rounded-2xl border border-gray-700 font-mono"
              >
                {q}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default VectorDBPanel;
