import { useTranslation } from 'react-i18next';
import avatar from '@/assets/images/chiko.jpg';
import { useAppSelector } from '@/hooks/business/useStore';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  lastLogin: string;
  avatar: string;
}

const UserProfileCard = () => {
  const { t } = useTranslation();
  const userInfo = useAppSelector(state => state.auth.userInfo);

  const userDetail: UserInfo = {
    name: userInfo.userName,
    email: 'chiko@example.com',
    phone: '138-0013-8000',
    department: '技术部',
    position: '前端开发工程师',
    joinDate: '2023-01-15',
    lastLogin: new Date().toLocaleString('zh-CN'),
    avatar
  };

  return (
    <ACard className="card-wrapper">
      <div className="text-center">
        <div className="relative mb-4 inline-block">
          <AAvatar
            src={userDetail.avatar}
            size={96}
            className="shadow-lg ring-4 ring-primary/20"
          />
          <div className="absolute h-6 w-6 rounded-full bg-green-400 ring-4 ring-white -bottom-1 -right-1 dark:ring-gray-800" />
        </div>

        <ATypography.Title level={4} className="!mb-2">
          {userDetail.name}
        </ATypography.Title>

        <ATypography.Text type="secondary" className="mb-4 block">
          {userDetail.position} | {userDetail.department}
        </ATypography.Text>

        <div className="mb-6">
          <ATag color="blue" className="mr-2">{t('page.userCenter.status.employed')}</ATag>
          <ATag color="green">{t('page.userCenter.status.online')}</ATag>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:mail-line" />
          <ATypography.Text>{userDetail.email}</ATypography.Text>
        </div>
        <div className="flex items-center">
          <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:phone-line" />
          <ATypography.Text>{userDetail.phone}</ATypography.Text>
        </div>
        <div className="flex items-center">
          <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:calendar-line" />
          <ATypography.Text>{t('page.userCenter.joinDate')}：{userDetail.joinDate}</ATypography.Text>
        </div>
        <div className="flex items-center">
          <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:time-line" />
          <ATypography.Text>{t('page.userCenter.lastLogin')}：{userDetail.lastLogin}</ATypography.Text>
        </div>
      </div>
    </ACard>
  );
};

export default UserProfileCard;
