import React, { useState, useEffect } from 'react';
import { useMacroState } from '../state/StateManager';
import { motion } from 'framer-motion';

const MacroParameterForm = () => {
  const { macros, triggerMacro } = useMacroState();
  const [selectedMacroId, setSelectedMacroId] = useState(null);
  const [parameters, setParameters] = useState({ key: '', value: '' });

  useEffect(() => {
    if (macros.length > 0) {
      setSelectedMacroId(macros[0].id);
    }
  }, [macros]);

  const handleParameterChange = (e) => {
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value,
    });
  };

  const handleTrigger = async () => {
    if (selectedMacroId) {
      try {
        await triggerMacro(selectedMacroId, parameters);
        alert('Macro triggered with parameters.');
      } catch (error) {
        console.error('Error triggering macro:', error);
        alert('Failed to trigger macro.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#1E2128] p-4 rounded-2xl border border-gray-700 text-[#E5E7EB]"
    >
      <label htmlFor="macro-select" className="block mb-2 font-semibold text-[#38BDF8]">
        Select Macro
      </label>
      <select
        id="macro-select"
        value={selectedMacroId || ''}
        onChange={(e) => setSelectedMacroId(Number(e.target.value))}
        className="w-full mb-4 rounded-2xl bg-[#0F1117] border border-gray-600 px-4 py-2 text-[#F9FAFB]"
      >
        {macros.map((macro) => (
          <option key={macro.id} value={macro.id}>
            {macro.sequence}
          </option>
        ))}
      </select>
      <label htmlFor="param-key" className="block mb-1 font-semibold">
        Parameter Key
      </label>
      <input
        type="text"
        name="key"
        value={parameters.key}
        onChange={handleParameterChange}
        className="w-full mb-4 rounded-2xl bg-[#0F1117] border border-gray-600 px-4 py-2 text-[#F9FAFB]"
        placeholder="Parameter key"
      />
      <label htmlFor="param-value" className="block mb-1 font-semibold">
        Parameter Value
      </label>
      <input
        type="text"
        name="value"
        value={parameters.value}
        onChange={handleParameterChange}
        className="w-full mb-4 rounded-2xl bg-[#0F1117] border border-gray-600 px-4 py-2 text-[#F9FAFB]"
        placeholder="Parameter value"
      />
      <button
        onClick={handleTrigger}
        className="bg-[#38BDF8] text-[#0F1117] px-6 py-3 rounded-2xl font-semibold hover:bg-[#22A7F0] transition w-full"
      >
        Trigger Macro
      </button>
    </motion.div>
  );
};

export default MacroParameterForm;
