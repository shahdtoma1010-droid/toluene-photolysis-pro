import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";

import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SimulationProvider } from "./contexts/SimulationContext";

import Home from "./pages/Home";
import SimulationLab from "./pages/SimulationLab";
import Comparison from "./pages/Comparison";
import Theory from "./pages/Theory";

/* ================= Router ================= */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/simulation" component={SimulationLab} />
      <Route path="/comparison" component={Comparison} />
      <Route path="/theory" component={Theory} />
      <Route path="/404" component={NotFound} />
      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

/* ================= App ================= */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <SimulationProvider>
          <TooltipProvider>
            <Toaster />

            {/* ===== Graduation Project Badge ===== */}
            <div
              style={{
                position: "fixed",
                top: "16px",
                right: "24px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#c7d2fe",
                background: "rgba(15, 23, 42, 0.6)",
                padding: "6px 12px",
                borderRadius: "8px",
                zIndex: 1000,
                backdropFilter: "blur(6px)",
              }}
            >
              Graduation Project – Physics Department, Faculty of Science, Class of
              2026
            </div>

            <Router />
          </TooltipProvider>
        </SimulationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
