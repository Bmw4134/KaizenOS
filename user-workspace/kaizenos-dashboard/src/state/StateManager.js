/**
 * StateManager.js
 * Centralized macro state manager using React context and hooks
 * Manages macros, execution state, schedules, and semantic logs
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import useLLMMacroOrchestrator from '../llm_macro_orchestrator';

const MacroStateContext = createContext();

export const MacroStateProvider = ({ children }) => {
  const {
    macros,
    addMacro,
    editMacro,
    deleteMacro,
    executeMacro,
  } = useLLMMacroOrchestrator();

  const [executionHistory, setExecutionHistory] = useState([]);
  const [scheduledMacros, setScheduledMacros] = useState([]);

  // Fetch macros (mocked as from orchestrator)
  const fetchMacros = () => {
    return macros;
  };

  // Trigger macro execution and log result
  const triggerMacro = (id, params) => {
    const result = executeMacro(id, params);
    if (result) {
      setExecutionHistory((prev) => [
        { id: Date.now(), macroId: id, output: result.output, timestamp: result.timestamp },
        ...prev,
      ]);
    }
    return result;
  };

  // Schedule macro execution (mocked)
  const scheduleMacro = (id, schedule) => {
    setScheduledMacros((prev) => [...prev, { id: Date.now(), macroId: id, schedule }]);
  };

  // Get execution history
  const getExecutionHistory = () => {
    return executionHistory;
  };

  return (
    <MacroStateContext.Provider
      value={{
        macros,
        fetchMacros,
        addMacro,
        editMacro,
        deleteMacro,
        triggerMacro,
        scheduleMacro,
        getExecutionHistory,
        scheduledMacros,
      }}
    >
      {children}
    </MacroStateContext.Provider>
  );
};

export const useMacroState = () => {
  const context = useContext(MacroStateContext);
  if (!context) {
    throw new Error('useMacroState must be used within a MacroStateProvider');
  }
  return context;
};
