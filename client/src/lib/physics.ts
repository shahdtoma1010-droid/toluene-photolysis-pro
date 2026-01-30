/**
 * Physics Engine for Toluene Photolysis Simulation
 * Based on research: "Spatio-temporal photolysis rate profiles of UV254 irradiated toluene"
 */

// Constants from experimental data
export const CONSTANTS = {
  WAVELENGTH: 632.8, // nm (He-Ne laser)
  UV_WAVELENGTH: 254, // nm (UV source)
  INITIAL_REFRACTIVE_INDEX: 1.48788,
  FINAL_REFRACTIVE_INDEX: 1.48616,
  CUVETTE_DEPTH: 10, // mm
  CUVETTE_WIDTH: 10, // mm
  PHOTOLYSIS_RATE_SURFACE: 2.5e-5, // min^-1 (from literature)
  PHOTOLYSIS_RATE_DEPTH: 1.5e-5, // min^-1 (reduced at depth)
};

// Logistic decay parameters from experimental fitting
export const LOGISTIC_PARAMS = {
  EXPERIMENT_I_SURFACE: { n_initial: 1.48788, n_final: 1.48616, t_half: 16.13, p: 1.98 },
  EXPERIMENT_I_DEPTH: { n_initial: 1.48786, n_final: 1.48633, t_half: 15.41, p: 2.14 },
  EXPERIMENT_II_SURFACE: { n_initial: 1.48786, n_final: 1.48619, t_half: 26.52, p: 2.15 },
  EXPERIMENT_II_DEPTH: { n_initial: 1.48786, n_final: 1.48621, t_half: 26.82, p: 2.18 },
};

/**
 * Calculate refractive index using logistic decay model
 * n(t) = (n_initial - n_final) / (1 + (t / t_half)^p) + n_final
 */
export function calculateRefractiveIndex(
  time: number,
  mode: 'top' | 'bottom',
  depth: number
): number {
  const isDeep = depth > 2.5;
  const params =
    mode === 'top'
      ? isDeep
        ? LOGISTIC_PARAMS.EXPERIMENT_I_DEPTH
        : LOGISTIC_PARAMS.EXPERIMENT_I_SURFACE
      : isDeep
        ? LOGISTIC_PARAMS.EXPERIMENT_II_DEPTH
        : LOGISTIC_PARAMS.EXPERIMENT_II_SURFACE;

  const numerator = params.n_initial - params.n_final;
  const denominator = 1 + Math.pow(time / params.t_half, params.p);

  return numerator / denominator + params.n_final;
}

/**
 * Calculate fringe shift from refractive index change
 * Δm = (2 * d1 / λ) * Δn
 */
export function calculateFringeShift(
  refractiveIndexChange: number,
  cuvettePath: number = 10
): number {
  return (2 * cuvettePath / CONSTANTS.WAVELENGTH) * refractiveIndexChange;
}

/**
 * Calculate photolysis rate (dn/dt)
 * dn/dt = -k * I * n
 */
export function calculatePhotolysisRate(
  refractiveIndex: number,
  uvIntensity: number,
  depth: number,
  mode: 'top' | 'bottom'
): number {
  const baseRate = depth > 2.5 ? CONSTANTS.PHOTOLYSIS_RATE_DEPTH : CONSTANTS.PHOTOLYSIS_RATE_SURFACE;
  const modeMultiplier = mode === 'top' ? 1.2 : 1.0; // Top irradiation is faster due to O2
  const intensityFactor = uvIntensity / 1.0; // Normalize to 1.0

  return -baseRate * intensityFactor * modeMultiplier * refractiveIndex;
}

/**
 * Calculate spatial variation of refractive index
 * Simulates gradient from surface to depth
 */
export function calculateSpatialVariation(
  surfaceRefractiveIndex: number,
  depth: number,
  totalDepth: number = CONSTANTS.CUVETTE_DEPTH
): number {
  // Linear gradient from surface to depth
  const gradient = (CONSTANTS.INITIAL_REFRACTIVE_INDEX - surfaceRefractiveIndex) * 0.3;
  const depthFraction = depth / totalDepth;

  return surfaceRefractiveIndex - gradient * depthFraction;
}

/**
 * Calculate temperature effect on photolysis rate
 * Arrhenius-like relationship
 */
export function calculateTemperatureEffect(temperature: number, baseRate: number): number {
  const referenceTemp = 20;
  const tempCoefficient = 1.05; // 5% increase per degree

  return baseRate * Math.pow(tempCoefficient, temperature - referenceTemp);
}

/**
 * Simulate one time step of the photolysis process
 */
export function simulateTimeStep(
  currentRefractiveIndex: number,
  time: number,
  deltaTime: number,
  params: {
    temperature: number;
    uvIntensity: number;
    irradiationMode: 'top' | 'bottom';
    depth: number;
  }
): {
  refractiveIndex: number;
  photolysisRate: number;
  fringeShift: number;
} {
  // Use logistic model for more accurate results
  const newRefractiveIndex = calculateRefractiveIndex(
    time + deltaTime,
    params.irradiationMode,
    params.depth
  );

  const refractiveIndexChange = CONSTANTS.INITIAL_REFRACTIVE_INDEX - newRefractiveIndex;
  const fringeShift = calculateFringeShift(refractiveIndexChange);

  const photolysisRate = calculatePhotolysisRate(
    newRefractiveIndex,
    params.uvIntensity,
    params.depth,
    params.irradiationMode
  );

  return {
    refractiveIndex: newRefractiveIndex,
    photolysisRate,
    fringeShift,
  };
}

/**
 * Generate time series data for visualization
 */
export function generateTimeSeriesData(
  duration: number,
  timeStep: number,
  params: {
    temperature: number;
    uvIntensity: number;
    irradiationMode: 'top' | 'bottom';
    depth: number;
  }
): Array<{
  time: number;
  refractiveIndex: number;
  photolysisRate: number;
  fringeShift: number;
}> {
  const data = [];
  let currentTime = 0;

  while (currentTime <= duration) {
    const refractiveIndex = calculateRefractiveIndex(
      currentTime,
      params.irradiationMode,
      params.depth
    );

    const refractiveIndexChange = CONSTANTS.INITIAL_REFRACTIVE_INDEX - refractiveIndex;
    const fringeShift = calculateFringeShift(refractiveIndexChange);
    const photolysisRate = calculatePhotolysisRate(
      refractiveIndex,
      params.uvIntensity,
      params.depth,
      params.irradiationMode
    );

    data.push({
      time: currentTime,
      refractiveIndex,
      photolysisRate,
      fringeShift,
    });

    currentTime += timeStep;
  }

  return data;
}
