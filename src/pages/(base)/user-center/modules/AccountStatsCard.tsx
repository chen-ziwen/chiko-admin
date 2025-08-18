import { useTranslation } from 'react-i18next';

interface StatItem {
  label: string;
  value: string | number;
}

const AccountStatsCard = () => {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    {
      label: t('page.userCenter.loginCount'),
      value: 156
    },
    {
      label: t('page.userCenter.onlineTime'),
      value: '24.5h'
    },
    {
      label: t('page.userCenter.operationCount'),
      value: 892
    }
  ];

  return (
    <ACard title={t('page.userCenter.accountStats')} className="card-wrapper">
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <ACard size="small" className="rounded-lg bg-gray-50 dark:bg-[#2a2a2a]" key={index}>
            <div className="flex items-center justify-between">
              <ATypography.Text>{stat.label}</ATypography.Text>
              <ATypography.Title level={4} className="!mb-0">{stat.value}</ATypography.Title>
            </div>
          </ACard>
        ))}
      </div>
    </ACard>
  );
};

export default AccountStatsCard;
