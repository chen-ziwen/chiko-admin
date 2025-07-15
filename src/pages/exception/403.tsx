import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="size-full flex-center">
      <AResult
        status="403"
        subTitle={t('common.403Message')}
        title="403"
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

export default Forbidden;
