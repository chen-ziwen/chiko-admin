import clsx from 'clsx';
import KeepAlive, { useKeepAliveRef } from 'keepalive-for-react';

import { usePreviousRoute } from '@/features/router';
import { useThemeSettings } from '@/features/theme';
import { getReloadFlag, selectCacheRoutes, selectRemoveCacheKey, setRemoveCacheKey } from '@/stores/modules';

import './transition.css';

interface Props {
  closePadding?: boolean;
}

export const LayoutContent = ({ closePadding }: Props) => {
  const previousRoute = usePreviousRoute();

  const dispatch = useAppDispatch();

  const currentOutlet = useOutlet(previousRoute);

  const { pathname } = useLocation();

  const aliveRef = useKeepAliveRef();

  const removeCacheKey = useAppSelector(selectRemoveCacheKey);

  const cacheKeys = useAppSelector(selectCacheRoutes);

  const reload = useAppSelector(getReloadFlag);

  const themeSetting = useThemeSettings();

  const transitionName = themeSetting.page.animate ? themeSetting.page.animateMode : '';

  useUpdateEffect(() => {
    if (!aliveRef.current || !removeCacheKey) return;

    aliveRef.current.destroy(removeCacheKey);

    dispatch(setRemoveCacheKey(null));
  }, [removeCacheKey]);

  useUpdateEffect(() => {
    aliveRef.current?.refresh();
  }, [reload, transitionName]);

  return (
    <div className={clsx('h-full flex-grow bg-layout', { 'p-16px': !closePadding })}>
      <KeepAlive
        activeCacheKey={pathname}
        aliveRef={aliveRef}
        cacheNodeClassName={reload ? '' : transitionName}
        include={cacheKeys}
      >
        {!reload && currentOutlet}
      </KeepAlive>
    </div>
  );
};
