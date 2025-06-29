import React from 'react';
import { useMacroState } from '../state/StateManager';
import { motion } from 'framer-motion';

const MacroList = () => {
  const { macros, triggerMacro, scheduleMacro } = useMacroState();

  const handleTrigger = async (id) => {
    try {
      await triggerMacro(id, {});
      alert('Macro triggered successfully.');
    } catch (error) {
      console.error('Error triggering macro:', error);
      alert('Failed to trigger macro.');
    }
  };

  const handleSchedule = () => {
    // Scheduling UI can be enhanced later
    alert('Scheduling feature coming soon.');
  };

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 max-h-[400px] overflow-y-auto"
    >
      {macros.length === 0 ? (
        <p className="text-gray-500">No macros available.</p>
      ) : (
        macros.map((macro) => (
          <motion.li
            key={macro.id}
            className="bg-[#1E2128] p-4 rounded-2xl border border-gray-700 flex justify-between items-center"
            whileHover={{ scale: 1.02 }}
          >
            <div>
              <p className="font-mono text-[#A78BFA]">{macro.sequence}</p>
              <p className="text-sm text-[#F9FAFB]">Emotion: {macro.emotionalTag}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleTrigger(macro.id)}
                className="bg-[#38BDF8] text-[#0F1117] px-4 py-2 rounded-2xl font-semibold hover:bg-[#22A7F0] transition"
              >
                Trigger
              </button>
              <button
                onClick={handleSchedule}
                className="bg-[#A78BFA] text-[#0F1117] px-4 py-2 rounded-2xl font-semibold hover:bg-[#8B6FD1] transition"
              >
                Schedule
              </button>
            </div>
          </motion.li>
        ))
      )}
    </motion.ul>
  );
};

export default MacroList;
