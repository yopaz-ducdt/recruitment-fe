import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">
          Quản trị Hệ thống
        </h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Kiểm duyệt doanh nghiệp, tin tuyển dụng và quản lý tài khoản người dùng
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-outline font-medium uppercase">Doanh nghiệp chờ duyệt</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">2</span>
            <Badge variant="warning">Chờ xử lý</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-outline font-medium uppercase">Tin đăng chờ duyệt</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">5</span>
            <Badge variant="warning">Chờ xử lý</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-outline font-medium uppercase">Tổng số người dùng</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">142</span>
            <Badge variant="success">Hoạt động</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};
