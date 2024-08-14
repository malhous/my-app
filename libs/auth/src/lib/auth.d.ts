import { IResponse } from '@my-app/http';

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface Tokens {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type LoginResponse = IResponse<{ tokens: Tokens }>;
