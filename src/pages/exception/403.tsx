import { useNavigate } from 'react-router-dom';

import { $t } from '@/locales';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="size-full flex-center">
      <AResult
        status="403"
        subTitle={$t('common.403Message')}
        title="403"
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

export default Forbidden;
