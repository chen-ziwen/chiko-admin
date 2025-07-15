import { useNavigate } from 'react-router-dom';

import { $t } from '@/locales';

const ServerError = () => {
  const navigate = useNavigate();

  return (
    <div className="size-full flex-center">
      <AResult
        status="500"
        subTitle={$t('common.500Message')}
        title="500"
        extra={
          <AButton
            type="primary"
            onClick={() => navigate('/')}
          >
            {$t('common.backToHome')}
          </AButton>
        }
      />
    </div>
  );
};

export default ServerError;
