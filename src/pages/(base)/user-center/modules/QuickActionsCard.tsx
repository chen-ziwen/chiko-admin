import { useTranslation } from 'react-i18next';

interface ActionItem {
  icon: string;
  text: string;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

const QuickActionsCard = () => {
  const { t } = useTranslation();

  const actions: ActionItem[] = [
    {
      icon: 'mingcute:edit-line',
      text: t('page.userCenter.actions.editProfile'),
      type: 'primary'
    },
    {
      icon: 'mingcute:lock-line',
      text: t('page.userCenter.actions.changePassword')
    },
    {
      icon: 'mingcute:notification-line',
      text: t('page.userCenter.actions.messageSettings')
    },
    {
      icon: 'mingcute:download-line',
      text: t('page.userCenter.actions.exportData')
    }
  ];

  return (
    <ACard title={t('page.userCenter.quickActions')} className="mt-6 card-wrapper">
      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        {actions.map((action, index) => (
          <AButton
            type={action.type as any}
            icon={<SvgIcon icon={action.icon} />}
            key={index}
          >
            {action.text}
          </AButton>
        ))}
      </div>
    </ACard>
  );
};

export default QuickActionsCard;
