import { Icon } from '@iconify/react';
import { m } from 'motion/react';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: string;
  color: string;
  bgColor: string;
  delay: number;
}

const StatCard = ({ title, value, suffix, prefix, icon, color, bgColor, delay }: StatCardProps) => {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <ACard
        bodyStyle={{ padding: '32px' }}
        className="h-full border-0 rounded-2xl from-white to-gray-50 bg-gradient-to-br shadow-xl transition-all duration-300 dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl"
      >
        <div className="h-full flex flex-col">
          <div className="mb-4 flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 text-sm text-gray-600 font-medium dark:text-gray-300">{title}</div>
              <div className="flex items-baseline">
                {prefix && (
                  <span
                    className="mr-1 text-lg font-bold"
                    style={{ color }}
                  >
                    {prefix}
                  </span>
                )}
                <span
                  className="text-3xl font-bold"
                  style={{ color }}
                >
                  {value.toLocaleString()}
                </span>
                {suffix && (
                  <span
                    className="ml-1 text-lg font-bold"
                    style={{ color }}
                  >
                    {suffix}
                  </span>
                )}
              </div>
            </div>
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${bgColor} shadow-lg flex-shrink-0`}
            >
              <Icon
                className="text-2xl text-white"
                icon={icon}
              />
            </div>
          </div>

          <div className="mt-auto flex items-center text-sm">
            <Icon
              className="mr-1 text-green-500"
              icon="material-symbols:trending-up"
            />
            <span className="text-green-500 font-medium">+12.5%</span>
            <span className="ml-2 text-gray-500">较上月</span>
          </div>
        </div>
      </ACard>
    </m.div>
  );
};

export const StatisticsCards = () => {
  const statsData = [
    {
      title: '总用户数',
      value: 12580,
      icon: 'material-symbols:group',
      color: '#1890ff',
      bgColor: 'bg-blue-500',
      delay: 0.1
    },
    {
      title: '今日访问',
      value: 3456,
      icon: 'material-symbols:visibility',
      color: '#52c41a',
      bgColor: 'bg-green-500',
      delay: 0.2
    },
    {
      title: '销售额',
      value: 98765,
      prefix: '¥',
      icon: 'material-symbols:payments',
      color: '#fa8c16',
      bgColor: 'bg-orange-500',
      delay: 0.3
    },
    {
      title: '转化率',
      value: 85.6,
      suffix: '%',
      icon: 'material-symbols:trending-up',
      color: '#eb2f96',
      bgColor: 'bg-pink-500',
      delay: 0.4
    }
  ];

  return (
    <ARow gutter={[24, 24]}>
      {statsData.map((stat, index) => (
        <ACol
          key={index}
          lg={6}
          md={12}
          sm={12}
          xs={24}
        >
          <StatCard {...stat} />
        </ACol>
      ))}
    </ARow>
  );
};
