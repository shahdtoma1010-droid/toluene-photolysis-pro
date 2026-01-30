import { useState, useEffect, useCallback } from 'react';
import { generateTimeSeriesData, calculateRefractiveIndex, calculateFringeShift, calculatePhotolysisRate } from '@/lib/physics';
import { SimulationParams } from '@/contexts/SimulationContext';

export interface SimulationDataPoint {
  time: number;
  refractiveIndex: number;
  photolysisRate: number;
  fringeShift: number;
  spatialVariation?: number;
}

export function useSimulationData(params: SimulationParams, duration: number = 60, timeStep: number = 1) {
  const [data, setData] = useState<SimulationDataPoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Generate initial data
  useEffect(() => {
    const newData = generateTimeSeriesData(duration, timeStep, {
      temperature: params.temperature,
      uvIntensity: params.uvIntensity,
      irradiationMode: params.irradiationMode,
      depth: params.depth,
    });
    setData(newData);
    setCurrentIndex(0);
  }, [params, duration, timeStep]);

  // Get current data point
  const getCurrentDataPoint = useCallback((): SimulationDataPoint | null => {
    if (data.length === 0) return null;
    return data[Math.min(currentIndex, data.length - 1)];
  }, [data, currentIndex]);

  // Advance time
  const advanceTime = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
  }, [data.length]);

  // Reset simulation
  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  // Get data range for charts
  const getChartData = useCallback(() => {
    return data.slice(0, currentIndex + 1);
  }, [data, currentIndex]);

  return {
    data,
    currentIndex,
    currentDataPoint: getCurrentDataPoint(),
    advanceTime,
    reset,
    getChartData,
    isComplete: currentIndex >= data.length - 1,
  };
}
