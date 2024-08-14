import { reauthenticate,useAuth } from '@my-app/auth';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { httpClient } from './http.instance';

export const useHttpClient = () => {
  const { accessToken, refreshToken, login, logout } = useAuth();

  // Function to refresh the token
  const refreshAccessToken = useCallback(async () => {
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (!accessToken) {
      throw new Error('No accesss token available');
    }

    const response = await reauthenticate(accessToken, refreshToken);
    login(response.tokens);

    return response.tokens.accessToken;
  }, [accessToken, refreshToken, login]);

  // Request interceptor to attach the access token
  httpClient.interceptors.request.use(
    async (config) => {
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to refresh the token if needed
  httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<unknown, { _retry: boolean }>) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        originalRequest?.data &&
        !originalRequest?.data?._retry
      ) {
        originalRequest.data._retry = true;
        const newToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      }

      if (
        error.response?.status === 400 &&
        originalRequest?.url?.includes('token/refresh')
      ) {
        logout();
      }

      return Promise.reject(error);
    }
  );

  return httpClient;
};
