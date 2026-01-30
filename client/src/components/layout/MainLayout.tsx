import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
