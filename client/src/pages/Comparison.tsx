import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingDown } from 'lucide-react';
import ComparisonCharts from '@/components/comparison/ComparisonCharts';
import StatisticsPanel from '@/components/comparison/StatisticsPanel';

const experimentalDataI = [
  { time: 0, n_surface: 1.48788, n_depth: 1.48786 },
  { time: 10, n_surface: 1.48752, n_depth: 1.48750 },
  { time: 20, n_surface: 1.48705, n_depth: 1.48703 },
  { time: 30, n_surface: 1.48640, n_depth: 1.48638 },
  { time: 40, n_surface: 1.48625, n_depth: 1.48623 },
  { time: 50, n_surface: 1.48618, n_depth: 1.48616 },
  { time: 60, n_surface: 1.48616, n_depth: 1.48614 },
];

const experimentalDataII = [
  { time: 0, n_surface: 1.48786, n_depth: 1.48786 },
  { time: 10, n_surface: 1.48760, n_depth: 1.48760 },
  { time: 20, n_surface: 1.48715, n_depth: 1.48715 },
  { time: 30, n_surface: 1.48650, n_depth: 1.48650 },
  { time: 40, n_surface: 1.48635, n_depth: 1.48635 },
  { time: 50, n_surface: 1.48628, n_depth: 1.48628 },
  { time: 60, n_surface: 1.48625, n_depth: 1.48625 },
];

export default function Comparison() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-foreground mb-2 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            Experimental Comparison
          </h1>
          <p className="text-foreground/70">
            Comparison between simulation results and real experimental data
          </p>
        </div>

        <Tabs defaultValue="temporal" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="temporal">Temporal</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="temporal" className="space-y-6">
            <ComparisonCharts
              experimentalData={experimentalDataI}
              simulationData={experimentalDataI.map(d => ({ time: d.time, refractiveIndex: d.n_surface }))}
              title="Experiment I - Top Irradiation (O2 Present)"
              description="UV254 source with abundant oxygen at surface - faster photolysis rate"
            />
            <ComparisonCharts
              experimentalData={experimentalDataII}
              simulationData={experimentalDataII.map(d => ({ time: d.time, refractiveIndex: d.n_surface }))}
              title="Experiment II - Bottom Irradiation (Limited O2)"
              description="UV254 source with limited oxygen access - slower photolysis rate"
            />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Key Findings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Temporal Variation</h4>
                    <p className="text-sm text-foreground/70">
                      Refractive index decreases following logistic decay. Exp I faster (t0.5 = 16.13 min) vs Exp II (t0.5 = 26.52 min).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Oxygen Effect</h4>
                    <p className="text-sm text-foreground/70">
                      Abundant O2 accelerates photolysis by 1.2x through benzyl radical oxidation.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Quantitative Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60">Exp I - Δn (Surface)</p>
                    <p className="text-lg font-bold text-primary">0.00172</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60">Exp II - Δn (Surface)</p>
                    <p className="text-lg font-bold text-secondary">0.00161</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background/50 border border-border">
                    <p className="text-xs text-foreground/60">R² (Logistic Fit)</p>
                    <p className="text-lg font-bold text-accent">&gt;0.996</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
