/**
 * @handle {
 *  "constant": true
 * }
 */

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="size-full flex-center bg-layout">
      <AResult
        status="500"
        subTitle={t('common.500Message')}
        title="500"
        extra={
          <AButton
            type="primary"
            onClick={() => navigate('/')}
          >
            {t('common.backToHome')}
          </AButton>
        }
      />
    </div>
  );
};

export default ServerError;
