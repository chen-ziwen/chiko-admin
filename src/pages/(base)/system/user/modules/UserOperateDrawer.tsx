import { useRequest } from '@chiko-admin/hooks';
import type { FC } from 'react';

import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { useFormRules } from '@/features/form';
import { fetchGetAllRoles } from '@/services/api';

interface OptionsProps {
  label: string;
  value: string;
}

type Model = Pick<
  Api.SystemManage.User,
  'nickName' | 'status' | 'userEmail' | 'userGender' | 'userName' | 'userPhone' | 'userRoles'
>;

type RuleKey = Extract<keyof Model, 'status' | 'userName'>;

function getOptions(item: Api.SystemManage.AllRole) {
  return {
    label: item.roleName,
    value: item.roleCode
  };
}

const UserOperateDrawer: FC<Page.OperateDrawerProps> = ({ form, handleSubmit, onClose, open, operateType }) => {
  const { t } = useTranslation();

  const { data, run } = useRequest(fetchGetAllRoles, {
    manual: true
  });

  const { defaultRequiredRule } = useFormRules();

  const roleOptions: OptionsProps[] = data ? data.map(getOptions) : [];

  const rules: Record<RuleKey, App.Global.FormRule> = {
    status: defaultRequiredRule,
    userName: defaultRequiredRule
  };

  useUpdateEffect(() => {
    if (open) {
      run();
    }
  }, [open]);

  return (
    <ADrawer
      open={open}
      title={operateType === 'add' ? t('page.system.user.addUser') : t('page.system.user.editUser')}
      footer={
        <AFlex justify="space-between">
          <AButton onClick={onClose}>{t('common.cancel')}</AButton>
          <AButton
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </AButton>
        </AFlex>
      }
      onClose={onClose}
    >
      <AForm
        form={form}
        layout="vertical"
      >
        <AForm.Item
          label={t('page.system.user.userName')}
          name="userName"
          rules={[rules.userName]}
        >
          <AInput placeholder={t('page.system.user.form.userName')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.userGender')}
          name="userGender"
        >
          <ARadio.Group>
            {userGenderOptions.map(item => (
              <ARadio
                key={item.value}
                value={item.value}
              >
                {t(item.label)}
              </ARadio>
            ))}
          </ARadio.Group>
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.nickName')}
          name="nickName"
        >
          <AInput placeholder={t('page.system.user.form.nickName')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.userPhone')}
          name="userPhone"
        >
          <AInput placeholder={t('page.system.user.form.userPhone')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.userEmail')}
          name="userEmail"
        >
          <AInput placeholder={t('page.system.user.form.userEmail')} />
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.userStatus')}
          name="status"
          rules={[rules.status]}
        >
          <ARadio.Group>
            {enableStatusOptions.map(item => (
              <ARadio
                key={item.value}
                value={item.value}
              >
                {t(item.label)}
              </ARadio>
            ))}
          </ARadio.Group>
        </AForm.Item>

        <AForm.Item
          label={t('page.system.user.userRole')}
          name="userRoles"
        >
          <ASelect
            mode="multiple"
            options={roleOptions}
            placeholder={t('page.system.user.form.userRole')}
          />
        </AForm.Item>
      </AForm>
    </ADrawer>
  );
};

export default UserOperateDrawer;
