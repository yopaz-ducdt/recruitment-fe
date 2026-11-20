import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export const CandidateLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors px-3 py-1.5 rounded-lg ${
      isActive
        ? 'text-primary bg-primary/10'
        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40'
    }`;

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="border-b border-outline-variant/50 bg-surface-container-lowest sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/jobs" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-base shadow-xs">
                D
              </div>
              <span className="text-lg font-bold text-on-surface">DDAMatch</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/jobs" className={navLinkClass}>
                Tìm việc làm
              </NavLink>
              <NavLink to="/candidate/resumes" className={navLinkClass}>
                CV của tôi
              </NavLink>
              <NavLink to="/candidate/applications" className={navLinkClass}>
                Đơn ứng tuyển
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-on-surface">{user?.email}</p>
              <span className="text-[10px] text-secondary font-bold bg-secondary/10 px-1.5 py-0.5 rounded-sm">
                ỨNG VIÊN
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};
