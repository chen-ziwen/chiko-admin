import { Icon } from '@iconify/react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface CardDataProps {
  color: {
    start: string;
    end: string;
  };
  icon: string;
  key: string;
  title: string;
  unit: string;
  value: number;
  trend?: {
    value: number;
    isUp: boolean;
  };
  fromLastMonth: string;
}

function getGradientColor(color: CardDataProps['color']) {
  return `linear-gradient(135deg, ${color.start}, ${color.end})`;
}

function useGetCardData() {
  const { t } = useTranslation();

  const cardData: CardDataProps[] = [
    {
      color: {
        end: '#36cfc9',
        start: '#13c2c2'
      },
      icon: 'ant-design:line-chart-outlined',
      key: 'visitCount',
      title: t('page.home.visitCount'),
      unit: '',
      value: 8642,
      trend: {
        value: 15.8,
        isUp: true
      },
      fromLastMonth: t('page.home.fromLastMonth')
    },
    {
      color: {
        end: '#597ef7',
        start: '#2f54eb'
      },
      icon: 'ant-design:transaction-outlined',
      key: 'turnover',
      title: t('page.home.turnover'),
      unit: '$',
      value: 2358,
      trend: {
        value: 7.3,
        isUp: true
      },
      fromLastMonth: t('page.home.fromLastMonth')
    },
    {
      color: {
        end: '#73d13d',
        start: '#52c41a'
      },
      icon: 'ant-design:cloud-download-outlined',
      key: 'downloadCount',
      title: t('page.home.downloadCount'),
      unit: '',
      value: 862453,
      trend: {
        value: 9.2,
        isUp: true
      },
      fromLastMonth: t('page.home.fromLastMonth')
    },
    {
      color: {
        end: '#ff7a45',
        start: '#fa541c'
      },
      icon: 'ant-design:shopping-outlined',
      key: 'dealCount',
      title: t('page.home.dealCount'),
      unit: '',
      value: 6248,
      trend: {
        value: 2.8,
        isUp: false
      },
      fromLastMonth: t('page.home.fromLastMonth')
    }
  ];

  return cardData;
}

const CardItem = (data: CardDataProps, index: number) => {
  return (
    <ACol
      key={data.key}
      lg={6}
      md={12}
      span={24}
    >
      <m.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div
          className="h-full rounded-xl p-6 text-white shadow-lg transition-transform hover:-translate-y-1"
          style={{ backgroundImage: getGradientColor(data.color) }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{data.title}</h3>
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/20">
              <Icon
                className="text-2xl text-white"
                icon={data.icon}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-end">
              <span className="text-3xl font-bold">{data.unit}</span>
              <AStatistic
                className="!text-white"
                value={data.value}
                valueStyle={{ color: 'white', fontSize: '36px', fontWeight: 'bold', lineHeight: 1 }}
              />
            </div>

            {data.trend && (
              <div className="mt-2 flex items-center text-sm">
                <Icon
                  className="mr-1"
                  icon={data.trend.isUp ? 'mdi:arrow-up' : 'mdi:arrow-down'}
                />
                <span>{data.trend.value}%</span>
                <span className="ml-1 opacity-80">{data.fromLastMonth}</span>
              </div>
            )}
          </div>
        </div>
      </m.div>
    </ACol>
  );
};

const CardData = () => {
  const data = useGetCardData();

  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <ARow gutter={[24, 24]}>{data.map(CardItem)}</ARow>
    </m.div>
  );
};

export default CardData;
