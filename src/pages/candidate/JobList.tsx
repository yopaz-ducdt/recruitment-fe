import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const JobList: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-primary to-secondary rounded-3xl p-6 sm:p-8 text-primary-foreground shadow-md">
        <span className="inline-block text-xs font-semibold bg-surface-container-lowest/20 backdrop-blur-xs px-3 py-1 rounded-full mb-3">
          ⚡ AI Matching Engine v2.0
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Tìm việc làm phù hợp với năng lực của bạn
        </h1>
        <p className="mt-2 text-sm text-primary-foreground/80 max-w-2xl">
          Hệ thống sử dụng mô hình học máy đối sánh CV và tin tuyển dụng để đưa ra gợi ý chính xác nhất.
        </p>
      </div>

      {/* Filter Bar Scaffold */}
      <Card className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:flex-1">
          <input
            type="text"
            placeholder="Tìm theo chức danh, từ khóa hoặc công ty..."
            className="w-full h-10 px-3.5 text-sm rounded-lg border border-outline-variant focus:outline-hidden focus:border-primary"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-2">
          <select className="h-10 px-3 text-sm rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface-variant">
            <option>Tất cả địa điểm</option>
            <option>Hà Nội</option>
            <option>TP. Hồ Chí Minh</option>
            <option>Đà Nẵng</option>
            <option>Từ xa (Remote)</option>
          </select>
          <Button variant="primary" size="md">
            Tìm kiếm
          </Button>
        </div>
      </Card>

      {/* Sample Job Card */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
          Việc làm nổi bật
        </h2>

        <Card className="hover:border-primary/50 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-on-surface">
                  Senior Frontend Engineer (React/TypeScript)
                </span>
                <Badge variant="secondary">⚡ 94% Match</Badge>
              </div>
              <p className="text-xs text-on-surface-variant">
                Công ty Cổ phần Công nghệ DDASoft • Hà Nội • Full-time
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-xs bg-surface-container text-primary px-2 py-0.5 rounded-sm font-medium">
                  React 19
                </span>
                <span className="text-xs bg-surface-container text-primary px-2 py-0.5 rounded-sm font-medium">
                  TypeScript
                </span>
                <span className="text-xs bg-surface-container text-primary px-2 py-0.5 rounded-sm font-medium">
                  Tailwind CSS
                </span>
              </div>
            </div>

            <div className="text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
              <span className="text-sm font-bold text-success tabular-nums">
                25,000,000 - 40,000,000 đ
              </span>
              <Button size="sm" variant="primary">
                Xem chi tiết
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
