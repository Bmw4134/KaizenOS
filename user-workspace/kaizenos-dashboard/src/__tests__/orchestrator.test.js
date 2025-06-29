import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import useMacroTrainer from '../macro_trainer';
import useVectorDB from '../vector_db';
import useLLMMacroOrchestrator from '../llm_macro_orchestrator';

describe('Orchestrator Modules Integration Tests', () => {
  it('should add, edit, and delete macros correctly', () => {
    const { result } = renderHook(() => useMacroTrainer());

    act(() => {
      result.current.addMacro('test sequence', 'happy');
    });
    expect(result.current.macros.length).toBe(1);
    const macroId = result.current.macros[0].id;

    act(() => {
      result.current.editMacro(macroId, 'updated sequence', 'sad');
    });
    expect(result.current.macros[0].sequence).toBe('updated sequence');
    expect(result.current.macros[0].emotionalTag).toBe('sad');

    act(() => {
      result.current.deleteMacro(macroId);
    });
    expect(result.current.macros.length).toBe(0);
  });

  it('should add vectors and perform similarity search', () => {
    const { result } = renderHook(() => useVectorDB());

    act(() => {
      result.current.addVector([1, 2, 3]);
      result.current.addVector([4, 5, 6]);
    });
    expect(result.current.vectors.length).toBe(2);

    const results = result.current.similaritySearch([1, 2, 3], 1);
    expect(results.length).toBe(1);
    expect(results[0].score).toBeDefined();
  });

  it('should execute macro and log semantic output', () => {
    const { result: macroResult } = renderHook(() => useMacroTrainer());
    const { result: vectorResult } = renderHook(() => useVectorDB());

    const { result: llmResult } = renderHook(() =>
      useLLMMacroOrchestrator()
    );

    act(() => {
      macroResult.current.addMacro('execute sequence', 'neutral');
    });
    const macroId = macroResult.current.macros[0].id;

    const input = { vector: [0.1, 0.2, 0.3] };
    const result = llmResult.current.executeMacro(macroId, input);

    expect(result).toHaveProperty('output');
    expect(result).toHaveProperty('timestamp');
    expect(llmResult.current.vectors.length).toBeGreaterThan(0);
  });
});
