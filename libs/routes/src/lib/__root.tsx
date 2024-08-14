import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AxiosInstance } from 'axios';

export interface CustomRouterContext {
  auth: { isAuthenticated: boolean };
  queryClient: QueryClient;
  httpClient: AxiosInstance;
}

export const Route = createRootRouteWithContext<CustomRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
