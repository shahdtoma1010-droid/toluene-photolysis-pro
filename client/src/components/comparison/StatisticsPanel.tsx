import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, TrendingUp, Zap } from 'lucide-react';

interface StatisticsPanelProps {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    unit?: string;
    icon?: React.ReactNode;
    color?: string;
  }>;
}

export default function StatisticsPanel({ title, metrics }: StatisticsPanelProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Quantitative analysis metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-background/50 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs text-foreground/60">{metric.label}</p>
                {metric.icon && <div className="text-primary">{metric.icon}</div>}
              </div>
              <p className={`text-2xl font-bold ${metric.color || 'text-primary'}`}>
                {metric.value}
              </p>
              {metric.unit && <p className="text-xs text-foreground/50 mt-1">{metric.unit}</p>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
