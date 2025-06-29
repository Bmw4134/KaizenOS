import { describe, it, expect, beforeEach } from 'vitest';
import useLLMMacroOrchestrator from '../llm_macro_orchestrator';
import useMacroTrainer from '../macro_trainer';
import useVectorDB from '../vector_db';

describe('Orchestrator Modules Integration Tests', () => {
  let macroTrainer;
  let vectorDB;
  let llmOrchestrator;

  beforeEach(() => {
    macroTrainer = useMacroTrainer();
    vectorDB = useVectorDB();
    llmOrchestrator = useLLMMacroOrchestrator();
  });

  it('should add, edit, and delete macros correctly', () => {
    macroTrainer.addMacro('test sequence', 'happy');
    expect(macroTrainer.macros.length).toBe(1);
    const macroId = macroTrainer.macros[0].id;

    macroTrainer.editMacro(macroId, 'updated sequence', 'sad');
    expect(macroTrainer.macros[0].sequence).toBe('updated sequence');
    expect(macroTrainer.macros[0].emotionalTag).toBe('sad');

    macroTrainer.deleteMacro(macroId);
    expect(macroTrainer.macros.length).toBe(0);
  });

  it('should add vectors and perform similarity search', () => {
    vectorDB.addVector([1, 2, 3]);
    vectorDB.addVector([4, 5, 6]);
    expect(vectorDB.vectors.length).toBe(2);

    const results = vectorDB.similaritySearch([1, 2, 3], 1);
    expect(results.length).toBe(1);
    expect(results[0].score).toBeDefined();
  });

  it('should execute macro and log semantic output', () => {
    macroTrainer.addMacro('execute sequence', 'neutral');
    const macroId = macroTrainer.macros[0].id;

    const input = { vector: [0.1, 0.2, 0.3] };
    const result = llmOrchestrator.executeMacro(macroId, input);

    expect(result).toHaveProperty('output');
    expect(result).toHaveProperty('timestamp');
    expect(llmOrchestrator.vectors.length).toBeGreaterThan(0);
  });
});
