import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComparisonChartsProps {
  experimentalData: Array<{ time: number; n_surface: number; n_depth: number }>;
  simulationData: Array<{ time: number; refractiveIndex: number }>;
  title: string;
  description: string;
}

export default function ComparisonCharts({
  experimentalData,
  simulationData,
  title,
  description,
}: ComparisonChartsProps) {
  // Merge data for comparison
  const mergedData = experimentalData.map((exp, idx) => ({
    time: exp.time,
    experimental: exp.n_surface,
    simulation: simulationData[idx]?.refractiveIndex || exp.n_surface,
  }));

  // Calculate error metrics
  const errors = mergedData.map((point) => ({
    time: point.time,
    error: Math.abs(point.experimental - point.simulation) * 10000, // Convert to ppm
  }));

  const avgError =
    errors.reduce((sum, e) => sum + e.error, 0) / errors.length;
  const maxError = Math.max(...errors.map((e) => e.error));
  const rmse = Math.sqrt(errors.reduce((sum, e) => sum + e.error ** 2, 0) / errors.length);

  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={mergedData}>
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
                dataKey="experimental"
                stroke="#00D9FF"
                name="Experimental Data"
                dot={false}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="simulation"
                stroke="#9D4EDD"
                name="Simulation"
                dot={false}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Error Analysis</CardTitle>
          <CardDescription>Deviation between experimental and simulated data</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={errors}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" label={{ value: 'Error (ppm)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 14, 39, 0.9)',
                  border: '1px solid rgba(255, 183, 0, 0.3)',
                }}
              />
              <Bar dataKey="error" fill="#FFB700" name="Absolute Error" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 mb-2">Average Error</p>
            <p className="text-2xl font-bold text-primary">{avgError.toFixed(1)} ppm</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 mb-2">Max Error</p>
            <p className="text-2xl font-bold text-secondary">{maxError.toFixed(1)} ppm</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <p className="text-xs text-foreground/60 mb-2">RMSE</p>
            <p className="text-2xl font-bold text-accent">{rmse.toFixed(1)} ppm</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
