import { useTranslation } from 'react-i18next';

import avatar from '@/assets/images/chiko.jpg';
import { useAppSelector } from '@/hooks/business/useStore';

interface StatisticData {
  id: number;
  title: string;
  value: string;
}

const HeaderBanner = () => {
  const { t } = useTranslation();

  const userInfo = useAppSelector(state => state.auth.userInfo);

  const statisticData: StatisticData[] = [
    {
      id: 0,
      title: t('page.home.projectCount'),
      value: '8'
    },
    {
      id: 1,
      title: t('page.home.todo'),
      value: '2/9'
    },
    {
      id: 2,
      title: t('page.home.message'),
      value: '99'
    }
  ];
  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <ARow gutter={[16, 16]}>
        <ACol
          md={18}
          span={24}
        >
          <div className="flex items-center">
            <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full">
              <img
                alt="avatar"
                className="h-full w-full"
                src={avatar}
              />
            </div>
            <div className="pl-3">
              <h3 className="text-lg font-semibold">{t('page.home.greeting', { userName: userInfo.userName })}</h3>
              <p className="text-gray-500 leading-7">{t('page.home.weatherDesc')}</p>
            </div>
          </div>
        </ACol>

        <ACol
          md={6}
          span={24}
        >
          <ASpace
            className="w-full justify-end"
            size={24}
          >
            {statisticData.map(item => (
              <AStatistic
                className="whitespace-nowrap"
                key={item.id}
                title={item.title}
                value={item.value}
              />
            ))}
          </ASpace>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default HeaderBanner;
