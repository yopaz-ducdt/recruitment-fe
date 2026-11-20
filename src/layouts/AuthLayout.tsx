import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      {/* Top Navigation / Brand */}
      <header className="w-full border-b border-outline-variant/40 bg-surface-container-lowest/80 backdrop-blur-xs sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-xs">
              D
            </div>
            <div>
              <span className="text-lg font-bold text-on-surface tracking-tight">
                DDAMatch
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-secondary font-semibold bg-secondary/10 px-2 py-0.5 rounded-full">
                AI Precision
              </span>
            </div>
          </Link>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-on-surface-variant hidden md:inline">
              Hệ thống tuyển dụng thông minh
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/30 py-4 text-center text-xs text-outline">
        <p>© 2026 DDAMatch Recruitment Platform. Intelligent Precision Talent Architecture.</p>
      </footer>
    </div>
  );
};
