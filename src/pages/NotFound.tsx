import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-extrabold text-primary tracking-tight">404</h1>
      <h2 className="text-xl font-bold text-on-surface mt-3">Trang không tồn tại</h2>
      <p className="text-xs text-on-surface-variant mt-1.5 max-w-sm">
        Trang bạn đang tìm kiếm có thể đã bị di chuyển hoặc không còn hoạt động.
      </p>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">Quay lại trang chủ</Button>
        </Link>
      </div>
    </div>
  );
};
