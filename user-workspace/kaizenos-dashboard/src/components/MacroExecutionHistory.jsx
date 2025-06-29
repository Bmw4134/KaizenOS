import React from 'react';
import { useMacroState } from '../state/StateManager';
import { motion } from 'framer-motion';

const MacroExecutionHistory = () => {
  const { getExecutionHistory } = useMacroState();
  const history = getExecutionHistory();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-h-[400px] overflow-y-auto bg-[#1E2128] p-4 rounded-2xl border border-gray-700 font-mono text-[#E5E7EB]"
    >
      {history.length === 0 ? (
        <p className="text-gray-500">No execution history.</p>
      ) : (
        history.map((entry) => (
          <div key={entry.id} className="mb-4">
            <p>
              <span className="font-semibold text-[#38BDF8]">Macro ID:</span> {entry.macroId}
            </p>
            <p>
              <span className="font-semibold text-[#A78BFA]">Output:</span> {entry.output}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(entry.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default MacroExecutionHistory;
