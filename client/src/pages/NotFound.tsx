import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-display text-foreground mb-4">404</h1>
        <p className="text-2xl font-semibold text-foreground/80 mb-2">Page Not Found</p>
        <p className="text-foreground/60 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <a>
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
