import MainLayout from '@/components/layout/MainLayout';
import { useSimulation } from '@/contexts/SimulationContext';
import { generateTimeSeriesData } from '@/lib/physics';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChamberVisualization from '@/components/simulation/ChamberVisualization';
import ResearchInfo from '@/components/simulation/ResearchInfo';

export default function SimulationLab() {
  const { state, updateParams, updateState } = useSimulation();
  const [isRunning, setIsRunning] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);

  // Generate chart data when parameters change
  useEffect(() => {
    const data = generateTimeSeriesData(60, 1, {
      temperature: state.params.temperature,
      uvIntensity: state.params.uvIntensity,
      irradiationMode: state.params.irradiationMode,
      depth: state.params.depth,
    });
    setChartData(data);
  }, [state.params]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    updateParams({ time: 0 });
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-foreground mb-2">
            Simulation Lab
          </h1>
          <p className="text-foreground/70">
            Interactive chamber visualization with real-time parameter control
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Controls
                </CardTitle>
                <CardDescription>Adjust simulation parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Playback Controls */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={isRunning ? 'default' : 'outline'}
                    onClick={handlePlayPause}
                    className="flex-1 gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>

                {/* Temperature */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Temperature: {state.params.temperature}°C
                  </label>
                  <Slider
                    value={[state.params.temperature]}
                    onValueChange={(value) => updateParams({ temperature: value[0] })}
                    min={15}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* UV Intensity */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    UV Intensity: {state.params.uvIntensity.toFixed(2)} W/cm²
                  </label>
                  <Slider
                    value={[state.params.uvIntensity]}
                    onValueChange={(value) => updateParams({ uvIntensity: value[0] })}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Depth */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Measurement Depth: {state.params.depth.toFixed(1)} mm
                  </label>
                  <Slider
                    value={[state.params.depth]}
                    onValueChange={(value) => updateParams({ depth: value[0] })}
                    min={0}
                    max={5}
                    step={0.5}
                    className="w-full"
                  />
                </div>

                {/* Irradiation Mode */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Irradiation Mode
                  </label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={state.params.irradiationMode === 'top' ? 'default' : 'outline'}
                      onClick={() => updateParams({ irradiationMode: 'top' })}
                      className="flex-1"
                    >
                      Top (O₂)
                    </Button>
                    <Button
                      size="sm"
                      variant={state.params.irradiationMode === 'bottom' ? 'default' : 'outline'}
                      onClick={() => updateParams({ irradiationMode: 'bottom' })}
                      className="flex-1"
                    >
                      Bottom
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chamber Visualization */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Chamber Visualization</CardTitle>
                <CardDescription>Real-time photolysis process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-96 bg-gradient-to-b from-background to-sidebar/50 rounded-lg border border-border flex items-center justify-center">
                  <ChamberVisualization
                    depth={state.params.depth}
                    refractiveIndex={chartData.length > 0 ? chartData[Math.min(state.params.time, chartData.length - 1)]?.refractiveIndex || 1.48788 : 1.48788}
                    uvIntensity={state.params.uvIntensity}
                    irradiationMode={state.params.irradiationMode}
                    time={state.params.time}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Telemetry Data */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Telemetry Data</CardTitle>
                <CardDescription>Current simulation values</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60 mb-1">Refractive Index</p>
                    <p className="text-2xl font-bold text-primary font-mono">
                      {chartData.length > 0 ? chartData[Math.min(state.params.time, chartData.length - 1)]?.refractiveIndex.toFixed(5) : '1.48788'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60 mb-1">Fringe Shift (Δm)</p>
                    <p className="text-2xl font-bold text-secondary font-mono">
                      {chartData.length > 0 ? chartData[Math.min(state.params.time, chartData.length - 1)]?.fringeShift.toFixed(2) : '0.00'}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60 mb-1">Time (min)</p>
                    <p className="text-2xl font-bold text-accent font-mono">
                      {state.params.time.toFixed(0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Research Info */}
          <div className="lg:col-span-1">
            <ResearchInfo />
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          {/* Refractive Index Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Refractive Index vs Time</CardTitle>
              <CardDescription>Temporal evolution of optical properties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" domain={[1.486, 1.488]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.9)',
                      border: '1px solid rgba(0, 217, 255, 0.3)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="refractiveIndex"
                    stroke="#00D9FF"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Photolysis Rate Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Photolysis Rate vs Time</CardTitle>
              <CardDescription>Rate of chemical change (dn/dt)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(10, 14, 39, 0.9)',
                      border: '1px solid rgba(157, 78, 221, 0.3)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="photolysisRate"
                    stroke="#9D4EDD"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
