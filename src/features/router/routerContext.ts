import { createContext } from 'react';

import type { RouterContextType } from './router';

export const RouterContext = createContext<RouterContextType | null>(null);

export function useRouter() {
  const navigate = useContext(RouterContext);

  if (!navigate) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }

  return navigate;
}
