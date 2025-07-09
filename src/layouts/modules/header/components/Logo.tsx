import clsx from 'clsx';
import { Link, type LinkProps } from 'react-router-dom';

import SystemLogo from '@/components/AppLogo';

interface Props extends Omit<LinkProps, 'to'> {
  showTitle?: boolean;
  showLogo?: boolean;
}

const Logo: FC<Props> = memo(({ className, showTitle = true, showLogo = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden', className)}
      to={import.meta.env.VITE_ROUTE_HOME}
      {...props}
    >
      {showLogo && <SystemLogo className="text-32px text-primary" />}
      {showTitle && (
        <h2 className="pl-8px text-16px text-primary font-bold transition duration-300 ease-out">
          {t('system.title')}
        </h2>
      )}
    </Link>
  );
});

export default Logo;
