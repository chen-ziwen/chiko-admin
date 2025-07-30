import { Outlet } from 'react-router-dom';
import type { ShouldRevalidateFunctionArgs } from 'react-router-dom';

import { usePrevious, useRoute } from '@/features/router';

const RootLayout = () => {
  const route = useRoute();

  const previousRoute = usePrevious(route);

  const { handle, pathname } = route;

  const location = useRef<string | { path: string; replace: boolean } | null>(null);

  const { i18nKey, title } = handle;

  const { t } = useTranslation();

  useEffect(() => {
    document.title = i18nKey ? t(i18nKey) : title;
  }, [i18nKey, title, t]);

  useEffect(() => {
    window.NProgress?.done?.();
  }, [pathname]);

  return location.current ? (
    typeof location.current === 'string' ? (
      <Navigate to={location.current} />
    ) : (
      <Navigate
        replace={location.current.replace}
        to={location.current.path}
      />
    )
  ) : (
    <Outlet context={previousRoute} />
  );
};

export const loader = () => {
  window.NProgress?.start?.();

  return null;
};

export const shouldRevalidate = ({ currentUrl, nextUrl }: ShouldRevalidateFunctionArgs) => {
  if (currentUrl.pathname === nextUrl.pathname) {
    return false;
  }
  return true;
};

export default RootLayout;
