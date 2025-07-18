import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

import AppLogo from '@/components/AppLogo';

interface Props extends Omit<LinkProps, 'to'> {
  /** Whether to show the title */
  showTitle?: boolean;
}
export const LayoutLogo: FC<Props> = memo(({ className, showTitle = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden', className)}
      to={import.meta.env.VITE_ROUTE_HOME}
      {...props}
    >
      <AppLogo className="text-32px text-primary" />
      <h2
        className="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out"
        style={{ display: showTitle ? 'block' : 'none' }}
      >
        {t('system.title')}
      </h2>
    </Link>
  );
});
