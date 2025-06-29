/**
 * macro_trainer.js
 * Macro training orchestrator module for KaizenOS
 * Manages macro sequences, emotional tags, and training logic
 */

import { useState, useEffect } from 'react';

const useMacroTrainer = () => {
  const [macros, setMacros] = useState([]);

  // Add a new macro sequence
  const addMacro = (sequence, emotionalTag = 'neutral') => {
    const newMacro = {
      id: Date.now(),
      sequence,
      emotionalTag,
      createdAt: new Date(),
    };
    setMacros((prev) => [...prev, newMacro]);
  };

  // Edit an existing macro by id
  const editMacro = (id, updatedSequence, updatedEmotionalTag) => {
    setMacros((prev) =>
      prev.map((macro) =>
        macro.id === id
          ? { ...macro, sequence: updatedSequence, emotionalTag: updatedEmotionalTag }
          : macro
      )
    );
  };

  // Delete a macro by id
  const deleteMacro = (id) => {
    setMacros((prev) => prev.filter((macro) => macro.id !== id));
  };

  // Get macros filtered by emotional tag
  const getMacrosByEmotion = (emotion) => {
    return macros.filter((macro) => macro.emotionalTag === emotion);
  };

  return {
    macros,
    addMacro,
    editMacro,
    deleteMacro,
    getMacrosByEmotion,
  };
};

export default useMacroTrainer;
