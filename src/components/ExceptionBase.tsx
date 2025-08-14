import { globalConfig } from '@/config';

import SvgIcon from './SvgIcon';

type ExceptionType = '403' | '404' | '500';

interface Props {
  type: ExceptionType;
}

const ExceptionBase: FC<Props> = memo(({ type }) => {
  const { t } = useTranslation();
  const nav = useNavigate();

  const onClick = () => {
    nav(globalConfig.homePath);
  };

  const tipMap = {
    403: t('common.403Message'),
    404: t('common.404Message'),
    500: t('common.500Message')
  };

  return (
    <div className="size-full min-h-520px flex-col-center gap-24px overflow-hidden bg-layout">
      <div className="flex text-400px text-primary">
        <SvgIcon localIcon={type} />
      </div>
      <div className="text-center">
        <p className="mb-16px text-16px text-gray-600 dark:text-gray-400">
          {tipMap[type]}
        </p>
      </div>
      <AButton
        type="primary"
        onClick={onClick}
      >
        {t('common.backToHome')}
      </AButton>
    </div>
  );
});

export default ExceptionBase;
