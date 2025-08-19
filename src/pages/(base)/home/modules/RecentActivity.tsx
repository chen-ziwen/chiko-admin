import { Icon } from '@iconify/react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  icon: string;
  description: string;
}

const RecentActivity = () => {
  const { t } = useTranslation();

  const activities: ActivityItem[] = [
    {
      id: 1,
      title: t('page.home.activity.deploy'),
      time: '2025-3-28 14:23',
      type: 'success',
      icon: 'mdi:rocket-launch',
      description: t('page.home.activity.deployDesc')
    },
    {
      id: 2,
      title: t('page.home.activity.update'),
      time: '2025-3-27 09:15',
      type: 'info',
      icon: 'mdi:update',
      description: t('page.home.activity.updateDesc')
    },
    {
      id: 3,
      title: t('page.home.activity.alert'),
      time: '2025-3-26 22:45',
      type: 'warning',
      icon: 'mdi:alert-circle',
      description: t('page.home.activity.alertDesc')
    },
    {
      id: 4,
      title: t('page.home.activity.error'),
      time: '2025-3-25 18:30',
      type: 'error',
      icon: 'mdi:close-circle',
      description: t('page.home.activity.errorDesc')
    }
  ];

  const getIconColor = (type: ActivityItem['type']) => {
    switch (type) {
    case 'success':
      return 'text-green-500';
    case 'info':
      return 'text-blue-500';
    case 'warning':
      return 'text-yellow-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
    }
  };

  const getBgColor = (type: ActivityItem['type']) => {
    switch (type) {
    case 'success':
      return 'bg-green-100';
    case 'info':
      return 'bg-blue-100';
    case 'warning':
      return 'bg-yellow-100';
    case 'error':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
    }
  };

  return (
    <ACard
      className="h-full overflow-hidden rounded-xl shadow-md"
      title={t('page.home.recentActivity')}
      variant="borderless"
      styles={{
        body: {
          height: '344px',
          padding: '16px'
        }
      }}
    >
      <div className="relative h-full">
        <AList
          className="recent-activity-list relative h-full overflow-auto scrollbar-none"
          dataSource={activities}
          split={false}
          renderItem={(item, index) => (
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              key={item.id}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <AList.Item className="border-0 py-[9.5px]">
                <AList.Item.Meta
                  title={<div className="text-sm font-medium">{item.title}</div>}
                  avatar={
                    <div className={`h-8 w-8 flex items-center justify-center rounded-full ${getBgColor(item.type)}`}>
                      <Icon
                        className={`text-lg ${getIconColor(item.type)}`}
                        icon={item.icon}
                      />
                    </div>
                  }
                  description={
                    <div>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="mt-1 text-xs text-gray-400">{item.time}</p>
                    </div>
                  }
                />
              </AList.Item>
            </m.div>
          )}
        />
      </div>
    </ACard>
  );
};

export default RecentActivity;
