import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { authApi } from '@/services/authApi';
import type { ApiErrorResponse } from '@/types/api';

export const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState<boolean>(!!token);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>(
    token ? 'idle' : 'error'
  );
  const [message, setMessage] = useState<string>(
    token ? '' : 'Không tìm thấy mã xác thực trong đường dẫn.'
  );

  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    const executeVerify = async () => {
      try {
        const response = await authApi.verifyEmail({ token });
        if (isMounted) {
          setStatus('success');
          setMessage(response.message || 'Xác thực email thành công!');
        }
      } catch (err) {
        if (isMounted) {
          setStatus('error');
          if (isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
            setMessage(err.response.data.message);
          } else {
            setMessage('Mã xác thực email không hợp lệ hoặc đã hết hạn.');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void executeVerify();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResending(true);
    setResendStatus(null);
    try {
      const response = await authApi.resendVerification({ email: resendEmail });
      setResendStatus(response.message || 'Đã gửi lại email xác thực thành công.');
    } catch (err) {
      if (isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
        setResendStatus(err.response.data.message);
      } else {
        setResendStatus('Không thể gửi lại email. Vui lòng thử lại sau.');
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Xác thực Email
        </h1>
        <p className="mt-1.5 text-xs text-on-surface-variant">
          Kích hoạt tài khoản để trải nghiệm toàn bộ tính năng
        </p>
      </div>

      {isLoading && (
        <div className="py-8">
          <LoadingSpinner label="Đang kiểm tra và kích hoạt tài khoản..." />
        </div>
      )}

      {!isLoading && status === 'success' && (
        <div className="space-y-4">
          <Alert type="success" title="Thành công" message={message} />
          <p className="text-xs text-on-surface-variant text-center">
            Tài khoản của bạn đã được kích hoạt. Hãy đăng nhập để bắt đầu!
          </p>
          <div className="text-center pt-2">
            <Link to="/login">
              <Button variant="primary" className="w-full">
                Đăng nhập ngay
              </Button>
            </Link>
          </div>
        </div>
      )}

      {!isLoading && status === 'error' && (
        <div className="space-y-5">
          <Alert type="error" title="Xác thực không thành công" message={message} />

          <div className="pt-2 border-t border-outline-variant/40">
            <h2 className="text-xs font-semibold text-on-surface mb-2">
              Gửi lại email xác thực
            </h2>
            {resendStatus && (
              <Alert type="info" message={resendStatus} className="mb-3" />
            )}
            <form onSubmit={handleResend} className="space-y-3">
              <Input
                label="Email của bạn"
                type="email"
                required
                placeholder="name@company.com"
                value={resendEmail}
                onChange={(e) => setResendEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full"
                isLoading={isResending}
              >
                Gửi lại liên kết xác thực
              </Button>
            </form>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="text-xs text-primary font-semibold hover:underline"
            >
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};
