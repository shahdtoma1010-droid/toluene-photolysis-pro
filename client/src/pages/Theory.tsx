import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Zap, Beaker } from 'lucide-react';

export default function Theory() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display text-foreground mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Physics Theory
          </h1>
          <p className="text-foreground/70">
            Comprehensive explanation of UV photolysis, refractive index dynamics, and experimental methodology
          </p>
        </div>

        <Tabs defaultValue="equations" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="equations">Equations</TabsTrigger>
            <TabsTrigger value="mechanism">Mechanism</TabsTrigger>
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
          </TabsList>

          <TabsContent value="equations" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Logistic Decay Model</CardTitle>
                <CardDescription>Temporal evolution of refractive index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border font-mono text-sm">
                  <p className="text-primary mb-2">n(t) = (n_initial - n_final) / (1 + (t / t_half)^p) + n_final</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Parameters:</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• n_initial = 1.48788 (initial refractive index)</li>
                    <li>• n_final = 1.48616 (final refractive index)</li>
                    <li>• t_half = 16.13 min (Exp I) or 26.52 min (Exp II)</li>
                    <li>• p = 1.98 - 2.18 (decay exponent)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Fringe Shift Equation</CardTitle>
                <CardDescription>Optical path length difference</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border font-mono text-sm">
                  <p className="text-secondary mb-2">Δm = (2 * d1 / λ) * Δn</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Where:</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Δm = number of fringes shifted</li>
                    <li>• d1 = cuvette path length (10 mm)</li>
                    <li>• λ = He-Ne laser wavelength (632.8 nm)</li>
                    <li>• Δn = change in refractive index</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Photolysis Rate</CardTitle>
                <CardDescription>Rate of chemical change</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border font-mono text-sm">
                  <p className="text-accent mb-2">dn/dt = -k * I * n</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Components:</p>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• k = reaction rate constant (min^-1)</li>
                    <li>• I = UV intensity (W/cm²)</li>
                    <li>• n = refractive index</li>
                    <li>• Detection sensitivity: 10^-5 min^-1</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mechanism" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  UV254 Photolysis Mechanism
                </CardTitle>
                <CardDescription>Step-by-step chemical process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="font-semibold text-foreground mb-2">Step 1: Photon Absorption</p>
                    <p className="text-sm text-foreground/70 font-mono">Toluene + hν (UV254) → Toluene*</p>
                    <p className="text-xs text-foreground/60 mt-2">Toluene absorbs UV photons (4.88 eV) exceeding C-H bond energy (3.89 eV)</p>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                    <p className="font-semibold text-foreground mb-2">Step 2: C-H Bond Cleavage</p>
                    <p className="text-sm text-foreground/70 font-mono">Toluene* → Benzyl Radical + H•</p>
                    <p className="text-xs text-foreground/60 mt-2">Excited toluene breaks C-H bonds, forming benzyl radicals</p>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                    <p className="font-semibold text-foreground mb-2">Step 3: Radical Oxidation (O2-dependent)</p>
                    <p className="text-sm text-foreground/70 font-mono">Benzyl Radical + O2 → Oxidation Products</p>
                    <p className="text-xs text-foreground/60 mt-2">Oxygen oxidizes radicals, reducing recombination. Exp I (abundant O2) is 1.2x faster</p>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="font-semibold text-foreground mb-2">Step 4: Refractive Index Change</p>
                    <p className="text-sm text-foreground/70 font-mono">Δn = -0.00172 (Exp I) or -0.00161 (Exp II)</p>
                    <p className="text-xs text-foreground/60 mt-2">Molecular structure change causes measurable optical property variation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary" />
                  Experimental Setup
                </CardTitle>
                <CardDescription>Michelson Interferometer Configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Optical System</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• He-Ne laser: 10 mW, λ = 632.8 nm</li>
                      <li>• Beam splitter for object/reference paths</li>
                      <li>• Sealed quartz cuvette (10×10×40 mm)</li>
                      <li>• CCD camera (ZEISS Axiocam, 5 fps)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">UV Source</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• Wavelength: 254 nm</li>
                      <li>• Power: 4 Watts (Heraeus Holding)</li>
                      <li>• Irradiation distance: 3 cm</li>
                      <li>• Duration: 60 minutes continuous</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Measurement Conditions</h4>
                    <ul className="text-sm text-foreground/70 space-y-1">
                      <li>• Temperature: 27 ± 1 °C</li>
                      <li>• Humidity: 50 ± 2%</li>
                      <li>• Dark ambient environment</li>
                      <li>• Sample: 1 mL toluene (99.9% purity)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Data Processing</CardTitle>
                <CardDescription>From interferograms to refractive index</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Signal Processing Pipeline:</p>
                  <ol className="text-sm text-foreground/70 space-y-2 list-decimal list-inside">
                    <li>Capture interference patterns (5 frames/sec)</li>
                    <li>Apply FFT to extract phase maps</li>
                    <li>Reconstruct 2D phase distribution</li>
                    <li>Calculate refractive index profiles</li>
                    <li>Fit to logistic decay model</li>
                    <li>Extract photolysis kinetics</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
