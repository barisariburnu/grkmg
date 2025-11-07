import { AxiosError } from 'axios';
import { QueryClient, QueryCache } from '@tanstack/react-query';
import { createRouter } from '@tanstack/react-router';
import { DirectionProvider } from '@/providers/direction-provider';
import { FontProvider } from '@/providers/font-provider';
import { LayoutProvider } from '@/providers/layout-provider';
import { SearchProvider } from '@/providers/search-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import * as Sentry from '@sentry/tanstackstart-react';
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query';
import { toast } from 'sonner';
import { handleServerError } from '@/lib/handle-server-error';
import * as TanstackQuery from './integrations/tanstack-query/root-provider.js';
// Import the generated route tree
import { routeTree } from './routeTree.gen.js';

// Create a new router instance
export const getRouter = () => {
  let router: ReturnType<typeof createRouter> | null = null;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (import.meta.env.DEV) {
            console.log({ failureCount, error });
          }

          if (failureCount >= 0 && import.meta.env.DEV) return false;
          if (failureCount > 3 && import.meta.env.PROD) return false;

          return !(
            error instanceof AxiosError &&
            [401, 403].includes(error.response?.status ?? 0)
          );
        },
        refetchOnWindowFocus: import.meta.env.PROD,
        staleTime: 10 * 1000,
      },
      mutations: {
        onError: (error) => {
          handleServerError(error);
          if (error instanceof AxiosError) {
            if (error.response?.status === 304) {
              toast.error('Content not modified!');
            }
          }
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) {
            toast.error('Session expired!');
            const redirect = router?.history.location.href ?? '/';
            router?.navigate({ to: '/sign-in', search: { redirect } });
          }
          if (error.response?.status === 500) {
            toast.error('Internal Server Error!');
            if (import.meta.env.PROD) {
              router?.navigate({ to: '/500' });
            }
          }
          if (error.response?.status === 403) {
            // router.navigate("/forbidden", { replace: true });
          }
        }
      },
    }),
  });

  router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider queryClient={queryClient}>
          <ThemeProvider>
            <FontProvider>
              <DirectionProvider>
                <LayoutProvider>
                  <SearchProvider>{props.children}</SearchProvider>
                </LayoutProvider>
              </DirectionProvider>
            </FontProvider>
          </ThemeProvider>
        </TanstackQuery.Provider>
      );
    },
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  if (!router.isServer) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [],
    });
  }

  return router;
};
