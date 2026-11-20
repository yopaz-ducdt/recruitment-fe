export type UserRole = 'CANDIDATE' | 'RECRUITER' | 'ADMIN';

export type UserStatus = 'ACTIVE' | 'LOCKED' | 'DISABLED';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface MeResponse {
  id: number;
  email: string;
  role: UserRole;
  emailVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface EmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
