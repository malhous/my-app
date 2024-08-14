import { useCreate, UsePublicCreateProps } from '@my-app/query-client';

import { LoginRequest, LoginResponse } from './auth';
  
export const useLogin = (props?: UsePublicCreateProps<LoginResponse>) => {
  const { mutate, ...data } = useCreate<LoginRequest, LoginResponse>({
    resource: 'login',
    ...props,
  });

  const handleLogin = (email: string, password: string) => {
    mutate({ values: { email, password } });
  };

  return { ...data, handleLogin };
};
