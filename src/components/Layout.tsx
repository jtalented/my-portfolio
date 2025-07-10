import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Premium background with subtle patterns */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      
      {/* Sophisticated grid pattern */}
      <div 
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      ></div>
      
      {/* Floating orbs for depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <main className="relative z-10">
        {children}
      </main>

      {/* Modern footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">JA</span>
              </div>
              <div>
                <p className="text-slate-300 font-medium">&copy; {new Date().getFullYear()} Jayden Allen</p>
                <p className="text-slate-500 text-sm">Full Stack Developer</p>
              </div>
            </div>
            
            <p className="text-slate-500 text-sm">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
