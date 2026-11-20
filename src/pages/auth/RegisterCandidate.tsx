import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/services/authApi';
import {
  extractApiErrors,
  PASSWORD_POLICY_MESSAGE,
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from '@/utils/validation';

export const RegisterCandidate: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Client-side validation matching Backend constraints
    const errors: Record<string, string> = {};

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passwordErr = validatePassword(password);
    if (passwordErr) errors.password = passwordErr;

    const confirmErr = validateConfirmPassword(password, confirmPassword);
    if (confirmErr) errors.confirmPassword = confirmErr;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await authApi.register({
        email: email.trim().toLowerCase(),
        password,
        role: 'CANDIDATE',
      });
      setSuccessMessage(response.message);
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

  const handleConfirmPasswordChange = (val: string) => {
    setConfirmPassword(val);
    if (fieldErrors.confirmPassword) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.confirmPassword;
        return next;
      });
    }
  };

  return (
    <Card className="w-full">
      <div className="mb-6 text-center">
        <span className="inline-block text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-2">
          Dành cho Ứng viên
        </span>
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Tạo tài khoản tìm việc
        </h1>
        <p className="mt-1.5 text-xs text-on-surface-variant">
          Khám phá cơ hội nghề nghiệp phù hợp và nhận phân tích CV bằng AI
        </p>
      </div>

      {successMessage ? (
        <div className="space-y-4">
          <Alert type="success" title="Đăng ký thành công" message={successMessage} />
          <p className="text-xs text-on-surface-variant text-center">
            Sau khi xác thực email, bạn có thể đăng nhập vào hệ thống.
          </p>
          <div className="text-center pt-2">
            <Link to="/login">
              <Button variant="primary" className="w-full">
                Đi tới Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {generalError && <Alert type="error" message={generalError} className="mb-5" />}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label="Địa chỉ Email"
              type="email"
              name="email"
              required
              maxLength={320}
              autoComplete="email"
              placeholder="candidate@example.com"
              value={email}
              error={fieldErrors.email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />

            <Input
              label="Mật khẩu"
              type="password"
              name="password"
              required
              maxLength={72}
              autoComplete="new-password"
              placeholder="••••••••"
              helperText={PASSWORD_POLICY_MESSAGE}
              value={password}
              error={fieldErrors.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
            />

            <Input
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              required
              maxLength={72}
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              error={fieldErrors.confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="md"
              isLoading={isSubmitting}
            >
              Đăng ký tài khoản
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-outline-variant/40 text-center space-y-2">
            <p className="text-xs text-on-surface-variant">
              Đã có tài khoản?{' '}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
            <p className="text-xs text-on-surface-variant">
              Bạn muốn tuyển dụng?{' '}
              <Link
                to="/register-recruiter"
                className="text-secondary font-semibold hover:underline"
              >
                Đăng ký Nhà tuyển dụng
              </Link>
            </p>
          </div>
        </>
      )}
    </Card>
  );
};
