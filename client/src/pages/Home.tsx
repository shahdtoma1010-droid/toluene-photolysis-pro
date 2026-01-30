import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'wouter';
import { Beaker, BookOpen, BarChart3, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-sidebar pt-20 pb-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Advanced Physics Simulation</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold font-display text-foreground mb-6 leading-tight">
              Toluene Photolysis
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Pro Simulator
              </span>
            </h1>

            <p className="text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
              Explore the spatio-temporal dynamics of UV254-irradiated toluene through interactive simulation and real experimental data comparison.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/simulation">
                <a>
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Beaker className="w-5 h-5" />
                    Launch Simulation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </Link>
              <Link href="/theory">
                <a>
                  <Button size="lg" variant="outline" className="gap-2">
                    <BookOpen className="w-5 h-5" />
                    View Theory
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold font-display text-foreground mb-16 text-center">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Beaker className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Interactive Chamber</h3>
              <p className="text-foreground/70">
                Real-time visualization of the photolysis process with dynamic particle interactions and UV radiation effects.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-secondary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Experimental Comparison</h3>
              <p className="text-foreground/70">
                Compare simulation results with real experimental data from peer-reviewed research on UV254 photolysis.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Physics Theory</h3>
              <p className="text-foreground/70">
                Comprehensive explanation of logistic decay models, photolysis kinetics, and refractive index dynamics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parameters Section */}
      <section className="py-20 px-4 bg-sidebar/30">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold font-display text-foreground mb-16 text-center">
            Adjustable Parameters
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Simulation Controls</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Temperature', value: '15-30 °C' },
                  { label: 'UV Intensity', value: '0.5-2.0 W/cm²' },
                  { label: 'Irradiation Mode', value: 'Top / Bottom' },
                  { label: 'Simulation Time', value: '0-60 minutes' },
                  { label: 'Measurement Depth', value: '0-5 mm' },
                ].map((param, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 rounded-lg bg-card border border-border/50">
                    <span className="font-medium text-foreground">{param.label}</span>
                    <span className="text-primary font-mono text-sm">{param.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Measured Outputs</h3>
              <ul className="space-y-4">
                {[
                  { label: 'Refractive Index', unit: 'n' },
                  { label: 'Photolysis Rate', unit: 'dn/dt' },
                  { label: 'Fringe Shift', unit: 'Δm' },
                  { label: 'Spatial Gradient', unit: 'Δn/Δy' },
                  { label: 'Temperature Effect', unit: 'k(T)' },
                ].map((output, idx) => (
                  <li key={idx} className="flex justify-between items-center p-3 rounded-lg bg-card border border-border/50">
                    <span className="font-medium text-foreground">{output.label}</span>
                    <span className="text-secondary font-mono text-sm">{output.unit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold font-display text-foreground mb-4">
              Ready to Explore?
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Launch the interactive simulation to see how UV254 irradiation affects toluene's optical properties in real-time.
            </p>
            <Link href="/simulation">
              <a>
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Beaker className="w-5 h-5" />
                  Start Simulation
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
