import { useNavigate } from 'react-router-dom';

import { $t } from '@/locales';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="size-full flex-center">
      <AResult
        status="404"
        subTitle={$t('common.404Message')}
        title="404"
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

export default NotFound;
