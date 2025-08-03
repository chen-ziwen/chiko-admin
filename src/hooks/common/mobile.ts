import { getIsMobile } from '@/stores/modules';

export function useMobile() {
  const isMobile = useAppSelector(getIsMobile);

  return isMobile;
}
