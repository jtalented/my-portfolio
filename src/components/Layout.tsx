import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans leading-relaxed">
      {/* Optional: Keep this if you want it sticky at top, else move it into Hero */}
      {/* <header className="py-6 px-6 md:px-12 border-b border-gray-800 z-50 relative">
        <h1 className="text-2xl font-bold text-white">Jayden Allen</h1>
      </header> */}

      <main className="space-y-32">
        {children}
      </main>

      <footer className="text-sm text-gray-500 text-center py-6 border-t border-gray-800">
        &copy; {new Date().getFullYear()} Jayden Allen.
      </footer>
    </div>
  );
};

export default Layout;
