import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const RecruiterDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">
            Bảng điều khiển Nhà tuyển dụng
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Quản lý chiến dịch tuyển dụng và theo dõi hồ sơ ứng viên
          </p>
        </div>
        <Button variant="secondary" size="md">
          + Đăng tin mới
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-outline font-medium uppercase">Tin đang đăng</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">4</span>
            <Badge variant="primary">Đang mở</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-outline font-medium uppercase">Hồ sơ ứng tuyển</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">28</span>
            <Badge variant="secondary">⚡ AI Đã chấm</Badge>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-outline font-medium uppercase">Lịch phỏng vấn</p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-bold text-on-surface tabular-nums">3</span>
            <Badge variant="warning">Tuần này</Badge>
          </div>
        </Card>
      </div>
    </div>
  );
};
