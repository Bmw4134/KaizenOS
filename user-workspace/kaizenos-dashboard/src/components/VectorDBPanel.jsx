import React, { useState } from 'react';

const VectorDBPanel = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSearch = () => {
    if (!query.trim()) return;
    // TODO: Connect to vector_db.js for real similarity search
    // For now, simulate vector DB search results
    const simulatedResults = [
      { id: 1, text: `Result for "${query}" #1`, score: 0.95 },
      { id: 2, text: `Result for "${query}" #2`, score: 0.89 },
      { id: 3, text: `Result for "${query}" #3`, score: 0.85 },
    ];
    setResults(simulatedResults);
    setHistory([query, ...history]);
    setQuery('');
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Vector DB Browser</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter vector search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Results:</h3>
        {results.length === 0 ? (
          <p className="text-gray-500">No results yet.</p>
        ) : (
          <ul className="list-disc list-inside">
            {results.map((res) => (
              <li key={res.id}>
                {res.text} (Score: {res.score})
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Query History:</h3>
        {history.length === 0 ? (
          <p className="text-gray-500">No previous queries.</p>
        ) : (
          <ul className="list-disc list-inside">
            {history.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VectorDBPanel;
