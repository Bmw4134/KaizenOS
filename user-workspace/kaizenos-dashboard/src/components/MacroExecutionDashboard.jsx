import React from 'react';
import MacroList from './MacroList';
import MacroExecutionHistory from './MacroExecutionHistory';
import MacroParameterForm from './MacroParameterForm';
import { MacroStateProvider } from '../state/StateManager';

const MacroExecutionDashboard = () => {
  return (
    <MacroStateProvider>
      <div className="p-6 bg-[#0F1117] rounded-2xl shadow-xl backdrop-blur-md max-w-5xl mx-auto text-[#E5E7EB] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-[#38BDF8]">Macros</h2>
          <MacroList />
        </div>
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-[#38BDF8]">Execution History</h2>
          <MacroExecutionHistory />
        </div>
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-4 text-[#38BDF8]">Parameters</h2>
          <MacroParameterForm />
        </div>
      </div>
    </MacroStateProvider>
  );
};

export default MacroExecutionDashboard;
