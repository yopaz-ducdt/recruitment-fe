import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types/api';

/**
 * Backend Password Policy:
 * REGEX: ^(?=.*[A-Za-z])(?=.*\d).{8,72}$
 * MESSAGE: Mật khẩu từ 8 đến 72 ký tự, gồm ít nhất một chữ và một số
 */
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;
export const PASSWORD_POLICY_MESSAGE =
  'Mật khẩu từ 8 đến 72 ký tự, gồm ít nhất một chữ và một số.';

export const MAX_EMAIL_LENGTH = 320;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Vui lòng nhập địa chỉ email.';
  }
  if (trimmed.length > MAX_EMAIL_LENGTH) {
    return `Email không được vượt quá ${MAX_EMAIL_LENGTH} ký tự.`;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Địa chỉ email không đúng định dạng.';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return 'Vui lòng nhập mật khẩu.';
  }
  if (password.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự.';
  }
  if (password.length > 72) {
    return 'Mật khẩu không được vượt quá 72 ký tự.';
  }
  if (!PASSWORD_REGEX.test(password)) {
    return PASSWORD_POLICY_MESSAGE;
  }
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return 'Vui lòng xác nhận mật khẩu.';
  }
  if (password !== confirmPassword) {
    return 'Mật khẩu xác nhận không khớp.';
  }
  return null;
};

export interface ExtractedApiError {
  generalError: string | null;
  fieldErrors: Record<string, string>;
  code?: string;
}

export const extractApiErrors = (err: unknown): ExtractedApiError => {
  if (isAxiosError<ApiErrorResponse>(err) && err.response?.data) {
    const data = err.response.data;
    const fieldErrors: Record<string, string> = { ...(data.fields || {}) };
    let generalError: string | null = data.message || 'Đã có lỗi xảy ra.';

    // If specific known code
    if (data.code === 'EMAIL_ALREADY_EXISTS') {
      fieldErrors.email = data.message || 'Email đã được sử dụng.';
    } else if (data.code === 'WRONG_CURRENT_PASSWORD') {
      fieldErrors.currentPassword = data.message || 'Mật khẩu hiện tại không đúng.';
    } else if (data.code === 'VALIDATION_ERROR' && Object.keys(fieldErrors).length > 0) {
      // If validation error with field details, show field errors and clear/soften general error
      generalError = 'Vui lòng kiểm tra lại các trường thông tin bên dưới.';
    }

    return {
      generalError,
      fieldErrors,
      code: data.code,
    };
  }

  return {
    generalError: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
    fieldErrors: {},
  };
};
