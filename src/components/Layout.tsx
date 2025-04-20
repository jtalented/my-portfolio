import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans leading-relaxed">
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
