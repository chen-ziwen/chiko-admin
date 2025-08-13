/**
 * @handle {
 *   "icon": "lucide:user-circle",
 *   "keepAlive": true,
 *   "hideInMenu": true
 * }
 */

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

interface RoleInfo {
  name: string;
  description: string;
  permissions: string[];
  color: string;
}

const UserCenter = () => {
  const { t } = useTranslation();
  const userInfo = useAppSelector(state => state.auth.userInfo);

  // 调试：检查国际化是否正常工作
  console.log('Translation test:', {
    userCenter: t('common.userCenter'),
    description: t('page.userCenter.description'),
    superAdmin: t('page.userCenter.roles.superAdmin')
  });

  // 模拟用户详细信息
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

  // 根据用户角色生成角色信息
  const getRoleInfo = (): RoleInfo[] => {
    const roleMap: Record<string, RoleInfo> = {
      R_SUPER: {
        name: t('page.userCenter.roles.superAdmin'),
        description: t('page.userCenter.roles.superAdminDesc'),
        permissions: [
          t('page.userCenter.permissions.userManagement'),
          t('page.userCenter.permissions.roleManagement'),
          t('page.userCenter.permissions.systemConfig'),
          t('page.userCenter.permissions.dataManagement'),
          t('page.userCenter.permissions.logView')
        ],
        color: 'red'
      },
      R_ADMIN: {
        name: t('page.userCenter.roles.admin'),
        description: t('page.userCenter.roles.adminDesc'),
        permissions: [
          t('page.userCenter.permissions.userManagement'),
          t('page.userCenter.permissions.roleManagement'),
          t('page.userCenter.permissions.dataManagement')
        ],
        color: 'blue'
      }
    };

    // 如果没有角色，显示普通用户
    if (userInfo.roles.length === 0) {
      return [{
        name: t('page.userCenter.roles.user'),
        description: t('page.userCenter.roles.userDesc'),
        permissions: [
          t('page.userCenter.permissions.dataView'),
          t('page.userCenter.permissions.personalSettings')
        ],
        color: 'green'
      }];
    }

    return userInfo.roles.map(role => roleMap[role] || {
      name: role,
      description: t('page.userCenter.roles.customRole'),
      permissions: [t('page.userCenter.permissions.basicPermission')],
      color: 'default'
    });
  };

  const roleInfoList = getRoleInfo();

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-xl text-gray-900 font-bold sm:text-2xl dark:text-white">
          {t('common.userCenter')}
        </h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base dark:text-gray-400">
          {t('page.userCenter.description')}
        </p>
      </div>

      <ARow gutter={[16, 16]}>
        {/* 个人信息卡片 - 响应式布局 */}
        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <ACard className="card-wrapper">
            <div className="text-center">
              <div className="relative mb-4 inline-block">
                <div className="h-20 w-20 overflow-hidden rounded-full shadow-lg ring-4 ring-primary/20 sm:h-24 sm:w-24">
                  <img
                    alt="avatar"
                    className="h-full w-full object-cover"
                    src={userDetail.avatar}
                  />
                </div>
                {/* 在线状态指示器 */}
                <div className="absolute h-4 w-4 rounded-full bg-green-400 ring-4 ring-white -bottom-1 -right-1 sm:h-6 sm:w-6 dark:ring-gray-800" />
              </div>
              
              <h2 className="mb-2 text-lg text-gray-900 font-bold sm:text-xl dark:text-white">
                {userDetail.name}
              </h2>
              <p className="mb-4 text-sm text-gray-600 sm:text-base dark:text-gray-400">
                {userDetail.position} | {userDetail.department}
              </p>

              {/* 用户标签 */}
              <div className="mb-6 flex justify-center gap-2">
                <ATag color="blue">{t('page.userCenter.status.employed')}</ATag>
                <ATag color="green">{t('page.userCenter.status.online')}</ATag>
              </div>
            </div>

            {/* 联系信息 */}
            <div className="space-y-3">
              <div className="flex items-center">
                <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:mail-line" />
                <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{userDetail.email}</span>
              </div>
              <div className="flex items-center">
                <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:phone-line" />
                <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{userDetail.phone}</span>
              </div>
              <div className="flex items-center">
                <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:calendar-line" />
                <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('page.userCenter.joinDate')}：{userDetail.joinDate}</span>
              </div>
              <div className="flex items-center">
                <SvgIcon className="mr-3 h-4 w-4 text-gray-500" icon="mingcute:time-line" />
                <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('page.userCenter.lastLogin')}：{userDetail.lastLogin}</span>
              </div>
            </div>
          </ACard>
        </ACol>

        {/* 角色权限卡片 - 响应式布局 */}
        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <ACard title={t('page.userCenter.rolePermissions')} className="card-wrapper">
            <div className="space-y-4">
              {roleInfoList.map((role, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="mb-2 flex items-center">
                    <ATag color={role.color as any} className="mr-2">
                      {role.name}
                    </ATag>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                    {role.description}
                  </p>
                  <div>
                    <h4 className="mb-2 text-sm text-gray-700 font-medium dark:text-gray-300">
                      {t('page.userCenter.permissionList')}：
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, pIndex) => (
                        <ATag key={pIndex} color="default" className="text-xs">
                          {permission}
                        </ATag>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ACard>
        </ACol>

        {/* 账户统计卡片 - 响应式布局 */}
        <ACol xs={24} sm={24} md={8} lg={8} xl={8}>
          <ACard title={t('page.userCenter.accountStats')} className="card-wrapper">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <div className="flex items-center">
                  <SvgIcon className="mr-3 h-5 w-5 text-blue-500" icon="mingcute:login-line" />
                  <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('page.userCenter.loginCount')}</span>
                </div>
                <span className="text-lg text-gray-900 font-bold dark:text-white">156</span>
              </div>
              
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <div className="flex items-center">
                  <SvgIcon className="mr-3 h-5 w-5 text-green-500" icon="mingcute:time-line" />
                  <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('page.userCenter.onlineTime')}</span>
                </div>
                <span className="text-lg text-gray-900 font-bold dark:text-white">24.5h</span>
              </div>
              
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <div className="flex items-center">
                  <SvgIcon className="mr-3 h-5 w-5 text-purple-500" icon="mingcute:mouse-line" />
                  <span className="text-sm text-gray-700 sm:text-base dark:text-gray-300">{t('page.userCenter.operationCount')}</span>
                </div>
                <span className="text-lg text-gray-900 font-bold dark:text-white">892</span>
              </div>
            </div>
          </ACard>
        </ACol>
      </ARow>

      {/* 快速操作卡片 - 响应式布局 */}
      <ACard title={t('page.userCenter.quickActions')} className="mt-6 card-wrapper">
        <div className="flex flex-col gap-4 sm:flex-row">
          <AButton type="primary" icon={<SvgIcon icon="mingcute:edit-line" />} className="w-full sm:w-auto">
            {t('page.userCenter.actions.editProfile')}
          </AButton>
          <AButton icon={<SvgIcon icon="mingcute:lock-line" />} className="w-full sm:w-auto">
            {t('page.userCenter.actions.changePassword')}
          </AButton>
          <AButton icon={<SvgIcon icon="mingcute:notification-line" />} className="w-full sm:w-auto">
            {t('page.userCenter.actions.messageSettings')}
          </AButton>
          <AButton icon={<SvgIcon icon="mingcute:download-line" />} className="w-full sm:w-auto">
            {t('page.userCenter.actions.exportData')}
          </AButton>
        </div>
      </ACard>
    </div>
  );
};

export default UserCenter;
