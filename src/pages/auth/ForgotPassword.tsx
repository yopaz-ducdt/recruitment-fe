import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { authApi } from '@/services/authApi';
import { extractApiErrors, validateEmail } from '@/utils/validation';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    const emailErr = validateEmail(email);
    if (emailErr) {
      setFieldErrors({ email: emailErr });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await authApi.forgotPassword({
        email: email.trim().toLowerCase(),
      });
      setSuccessMessage(
        response.message ||
          'Nếu địa chỉ email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.'
      );
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

  return (
    <Card className="w-full">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-on-surface tracking-tight">
          Quên mật khẩu?
        </h1>
        <p className="mt-1.5 text-xs text-on-surface-variant">
          Nhập email đăng ký để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      {successMessage ? (
        <div className="space-y-4">
          <Alert type="info" title="Kiểm tra email" message={successMessage} />
          <div className="text-center pt-2">
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Quay lại Đăng nhập
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
              placeholder="name@company.com"
              value={email}
              error={fieldErrors.email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              size="md"
              isLoading={isSubmitting}
            >
              Gửi liên kết đặt lại mật khẩu
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
