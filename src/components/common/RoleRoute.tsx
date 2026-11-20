import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types/auth';
import { LoadingSpinner } from './LoadingSpinner';

export interface RoleRouteProps {
  allowedRoles: UserRole[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <LoadingSpinner label="Đang kiểm tra quyền truy cập..." />
      </div>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    // If authenticated but unauthorized for this section, redirect to appropriate home
    if (user?.role === 'CANDIDATE') {
      return <Navigate to="/jobs" replace />;
    }
    if (user?.role === 'RECRUITER') {
      return <Navigate to="/recruiter/dashboard" replace />;
    }
    if (user?.role === 'ADMIN') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
