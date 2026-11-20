import React, { useEffect, useState } from 'react';
import { tokenStorage } from '@/services/apiClient';
import { authApi } from '@/services/authApi';
import type { LoginRequest, MeResponse, TokenResponse } from '@/types/auth';
import { AuthContext } from './authContextDef';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => !!tokenStorage.getAccessToken());

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      return;
    }

    let isMounted = true;
    authApi
      .getMe()
      .then((profile) => {
        if (isMounted) setUser(profile);
      })
      .catch(() => {
        tokenStorage.clearTokens();
        if (isMounted) setUser(null);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    const handleUnauthorized = () => {
      setUser(null);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => {
      isMounted = false;
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const login = async (credentials: LoginRequest): Promise<TokenResponse> => {
    setIsLoading(true);
    try {
      const tokens = await authApi.login(credentials);
      tokenStorage.setTokens(tokens);
      const profile = await authApi.getMe();
      setUser(profile);
      return tokens;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    const refreshToken = tokenStorage.getRefreshToken();
    try {
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } catch {
      // Ignore network errors during logout
    } finally {
      tokenStorage.clearTokens();
      setUser(null);
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    if (tokenStorage.getAccessToken()) {
      const profile = await authApi.getMe();
      setUser(profile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
