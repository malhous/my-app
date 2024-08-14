/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@fontsource/inter';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from '@my-app/auth';
import { useHttpClient } from '@my-app/http';
import { queryClient } from '@my-app/query-client';
import { routeTree } from '@my-app/routes';
import { CustomThemeProvider } from '@my-app/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    auth: { isAuthenticated: false },
    queryClient: null!,
    httpClient: null!,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();
  const httpClient = useHttpClient();
  return (
    <RouterProvider
      router={router}
      context={{
        auth: { isAuthenticated: auth.isAuthenticated },
        queryClient,
        httpClient,
      }}
    />
  );
}

// Render the app
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CustomThemeProvider>
            <CssBaseline enableColorScheme />
            <App />
          </CustomThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
