import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MacroExecutionDashboard from '../components/MacroExecutionDashboard';
import { MacroStateProvider } from '../state/StateManager';

describe('MacroExecutionDashboard Integration Tests', () => {
  it('renders dashboard components and triggers macro', async () => {
    render(
      <MacroStateProvider>
        <MacroExecutionDashboard />
      </MacroStateProvider>
    );

    // Check for macros header
    expect(screen.getByText(/Macros/i)).toBeInTheDocument();

    // Wait for macros to load and display
    await waitFor(() => {
      const triggerButtons = screen.getAllByText(/Trigger/i);
      expect(triggerButtons.length).toBeGreaterThan(0);
    });

    // Trigger the first macro
    const triggerButton = screen.getAllByText(/Trigger/i)[0];
    fireEvent.click(triggerButton);

    // Expect alert to be called (mock alert in test environment)
    // This can be enhanced with jest.spyOn or similar in real test setup
  });

  it('allows parameter form interaction and macro triggering', async () => {
    render(
      <MacroStateProvider>
        <MacroExecutionDashboard />
      </MacroStateProvider>
    );

    // Select macro dropdown
    const select = screen.getByLabelText(/Select Macro/i);
    expect(select).toBeInTheDocument();

    // Enter parameter key and value
    const keyInput = screen.getByPlaceholderText(/Parameter key/i);
    const valueInput = screen.getByPlaceholderText(/Parameter value/i);

    fireEvent.change(keyInput, { target: { value: 'param1' } });
    fireEvent.change(valueInput, { target: { value: 'value1' } });

    // Click trigger macro button
    const triggerButton = screen.getByText(/Trigger Macro/i);
    fireEvent.click(triggerButton);

    // Expect alert to be called (mock alert in test environment)
  });
});
