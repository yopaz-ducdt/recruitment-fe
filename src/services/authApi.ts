import { apiClient } from './apiClient';
import type { MessageResponse } from '@/types/api';
import type {
  ChangePasswordRequest,
  EmailRequest,
  LoginRequest,
  MeResponse,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
  TokenResponse,
  VerifyEmailRequest,
} from '@/types/auth';

export const authApi = {
  login: async (payload: LoginRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/auth/login', payload);
    return response.data;
  },

  register: async (payload: RegisterRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/register', payload);
    return response.data;
  },

  verifyEmail: async (payload: VerifyEmailRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/verify-email', payload);
    return response.data;
  },

  resendVerification: async (payload: EmailRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/resend-verification', payload);
    return response.data;
  },

  refresh: async (payload: RefreshTokenRequest): Promise<TokenResponse> => {
    const response = await apiClient.post<TokenResponse>('/auth/refresh', payload);
    return response.data;
  },

  logout: async (payload: RefreshTokenRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/logout', payload);
    return response.data;
  },

  forgotPassword: async (payload: EmailRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/forgot-password', payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/reset-password', payload);
    return response.data;
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>('/me');
    return response.data;
  },

  changePassword: async (payload: ChangePasswordRequest): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/me/password', payload);
    return response.data;
  },

  logoutAll: async (): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/me/logout-all');
    return response.data;
  },
};
