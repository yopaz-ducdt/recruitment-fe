import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/services/authApi';
import type { ApiErrorResponse } from '@/types/api';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError('Mã xác thực không hợp lệ hoặc đã hết hạn.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await authApi.resetPassword({
        token,
        newPassword,
      });
      setSuccessMessage(response.message || 'Mật khẩu đã được đặt lại thành công.');
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Không thể đặt lại mật khẩu. Vui lòng kiểm tra lại liên kết trong email.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Đặt lại mật khẩu
        </h1>
        <p className="mt-1.5 text-xs text-on-surface-variant">
          Nhập mật khẩu mới an toàn cho tài khoản của bạn
        </p>
      </div>

      {!token ? (
        <div className="space-y-4">
          <Alert
            type="error"
            title="Liên kết không hợp lệ"
            message="Không tìm thấy mã xác thực mật khẩu. Vui lòng kiểm tra liên kết được gửi trong email hoặc yêu cầu liên kết mới."
          />
          <div className="text-center pt-2">
            <Link to="/forgot-password">
              <Button variant="outline" className="w-full">
                Yêu cầu liên kết mới
              </Button>
            </Link>
          </div>
        </div>
      ) : successMessage ? (
        <div className="space-y-4">
          <Alert type="success" title="Hoàn tất" message={successMessage} />
          <div className="text-center pt-2">
            <Link to="/login">
              <Button variant="primary" className="w-full">
                Đăng nhập bằng mật khẩu mới
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {error && <Alert type="error" message={error} className="mb-5" />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              required
              autoComplete="new-password"
              placeholder="Ít nhất 8 ký tự gồm chữ và số"
              helperText="Tối thiểu 8 ký tự, gồm ít nhất một chữ cái và một số"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              label="Xác nhận mật khẩu mới"
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="md"
              isLoading={isSubmitting}
            >
              Cập nhật mật khẩu
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-outline-variant/40 text-center">
            <Link
              to="/login"
              className="text-xs text-primary font-semibold hover:underline"
            >
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </>
      )}
    </Card>
  );
};
