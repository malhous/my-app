import { LoginResponse } from './auth';
import { httpClient } from '@my-app/http/http.instance';

export const reauthenticate = async (
  accessToken: string,
  refreshToken: string
) => {
  const { data } = await httpClient.post<LoginResponse>('token/refresh', {
    accessToken,
    refreshToken,
  });

  return data.data;
};
