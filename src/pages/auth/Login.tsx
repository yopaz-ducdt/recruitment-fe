import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { extractApiErrors, validateEmail } from '@/utils/validation';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const errors: Record<string, string> = {};
    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    if (!password) {
      errors.password = 'Vui lòng nhập mật khẩu.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const tokens = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (tokens) {
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname;
        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate('/jobs', { replace: true });
        }
      }
    } catch (err) {
      const extracted = extractApiErrors(err);
      setGeneralError(extracted.generalError);
      setFieldErrors(extracted.fieldErrors);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (fieldErrors.email) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.email;
        return next;
      });
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (fieldErrors.password) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.password;
        return next;
      });
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Đăng nhập hệ thống
        </h1>
        <p className="mt-1.5 text-xs text-on-surface-variant">
          Truy cập tài khoản DDAMatch của bạn
        </p>
      </div>

      {generalError && <Alert type="error" message={generalError} className="mb-5" />}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Địa chỉ Email"
          type="email"
          name="email"
          required
          maxLength={320}
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          error={fieldErrors.email}
          onChange={(e) => handleEmailChange(e.target.value)}
        />

        <div>
          <Input
            label="Mật khẩu"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            error={fieldErrors.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <div className="mt-1.5 text-right">
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:underline font-medium"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full mt-2"
          size="md"
          isLoading={isSubmitting}
        >
          Đăng nhập
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-outline-variant/40 text-center space-y-2">
        <p className="text-xs text-on-surface-variant">
          Chưa có tài khoản Ứng viên?{' '}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Đăng ký tìm việc
          </Link>
        </p>
        <p className="text-xs text-on-surface-variant">
          Bạn là Nhà tuyển dụng?{' '}
          <Link
            to="/register-recruiter"
            className="text-secondary font-semibold hover:underline"
          >
            Đăng ký tuyển dụng
          </Link>
        </p>
      </div>
    </Card>
  );
};
