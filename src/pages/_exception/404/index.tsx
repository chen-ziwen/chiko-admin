/**
 * @handle {
 *  "constant": true
 * }
 */

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="size-full flex-center bg-layout">
      <AResult
        status="404"
        subTitle={t('common.404Message')}
        title="404"
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

export default NotFound;
