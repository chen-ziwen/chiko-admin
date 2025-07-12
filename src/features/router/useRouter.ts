import { RouterContext } from './routerContext';

export function useRouter() {
  const navigate = useContext(RouterContext);

  if (!navigate) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }

  return navigate;
}
