import { Beaker, BookOpen, BarChart3, Home, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="w-5 h-5" />,
    description: 'Overview & Introduction',
  },
  {
    label: 'Simulation Lab',
    href: '/simulation',
    icon: <Beaker className="w-5 h-5" />,
    description: 'Interactive Chamber',
  },
  {
    label: 'Comparison',
    href: '/comparison',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Experimental Data',
  },
  {
    label: 'Theory',
    href: '/theory',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Physics & Equations',
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground font-display">TOLUENE</h1>
            <p className="text-xs text-sidebar-accent">Photolysis Pro</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  'flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  'group relative'
                )}
              >
                <div className="mt-1 text-sidebar-accent group-hover:text-sidebar-accent-foreground transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-sidebar-foreground/60 group-hover:text-sidebar-accent-foreground/70">
                    {item.description}
                  </p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent/10 border border-sidebar-accent/20 rounded-lg p-3">
          <p className="text-xs text-sidebar-foreground/70">
            <span className="font-semibold text-sidebar-accent">UV254 Photolysis</span>
            {' '}Simulation Engine
          </p>
          <p className="text-xs text-sidebar-foreground/50 mt-1">
            Based on peer-reviewed research
          </p>
        </div>
      </div>
    </aside>
  );
}
