import React, { createContext, useContext, useState, useCallback } from 'react';

export interface SimulationParams {
  temperature: number;
  uvIntensity: number;
  time: number;
  irradiationMode: 'top' | 'bottom';
  depth: number;
}

export interface SimulationState {
  params: SimulationParams;
  refractiveIndex: number;
  photolysisRate: number;
  fringeShift: number;
  isRunning: boolean;
}

interface SimulationContextType {
  state: SimulationState;
  updateParams: (params: Partial<SimulationParams>) => void;
  updateState: (state: Partial<SimulationState>) => void;
  reset: () => void;
}

const defaultParams: SimulationParams = {
  temperature: 20,
  uvIntensity: 1.0,
  time: 0,
  irradiationMode: 'top',
  depth: 0,
};

const defaultState: SimulationState = {
  params: defaultParams,
  refractiveIndex: 1.48788,
  photolysisRate: 0,
  fringeShift: 0,
  isRunning: false,
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SimulationState>(defaultState);

  const updateParams = useCallback((params: Partial<SimulationParams>) => {
    setState((prev) => ({
      ...prev,
      params: { ...prev.params, ...params },
    }));
  }, []);

  const updateState = useCallback((newState: Partial<SimulationState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return (
    <SimulationContext.Provider value={{ state, updateParams, updateState, reset }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within SimulationProvider');
  }
  return context;
}
