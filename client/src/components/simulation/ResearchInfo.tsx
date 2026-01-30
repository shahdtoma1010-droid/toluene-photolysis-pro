import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Calendar } from 'lucide-react';

export default function ResearchInfo() {
  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Research Foundation
          </CardTitle>
          <CardDescription>Based on peer-reviewed experimental data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Study: Spatio-temporal Photolysis Rate Profiles</h4>
            <p className="text-sm text-foreground/70 mb-3">
              UV254-irradiated toluene photolysis dynamics studied using Michelson interferometry for real-time refractive index monitoring.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs text-foreground/60 mb-1">Measurement Method</p>
              <p className="font-semibold text-sm text-primary">Michelson Interferometer</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs text-foreground/60 mb-1">Detection Wavelength</p>
              <p className="font-semibold text-sm text-secondary">632.8 nm (He-Ne)</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs text-foreground/60 mb-1">UV Source</p>
              <p className="font-semibold text-sm text-accent">254 nm, 4W</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border">
              <p className="text-xs text-foreground/60 mb-1">Sample Volume</p>
              <p className="font-semibold text-sm text-primary">1 mL Toluene</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            Research Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/70">
            Developed as part of advanced physics research in photochemistry and optical measurement techniques.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Key Findings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-foreground/70">
          <p>• Logistic decay model accurately fits experimental data (R² &gt; 0.996)</p>
          <p>• Oxygen significantly accelerates photolysis rate (1.2x faster)</p>
          <p>• Spatial gradient observed: surface more reactive than depth</p>
          <p>• Temperature coefficient: ~5% increase per °C</p>
        </CardContent>
      </Card>
    </div>
  );
}
