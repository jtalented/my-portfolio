import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans leading-relaxed">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.1)_1px,transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>
      
      <main className="relative z-10 space-y-0">
        {children}
      </main>

      <footer className="relative z-10 text-sm text-slate-400 text-center py-12 bg-slate-800 border-t border-slate-600/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} Jayden Allen. All rights reserved.</p>
            <p className="text-slate-500">Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
