import { Button, Checkbox, Divider, Input, Space } from 'antd';

import { loginModuleRecord } from '@/constants/app';
import { useInitAuth } from '@/features/auth/auth';
import { SubmitEnterButton, useFormRules } from '@/features/form';

type AccountKey = 'admin' | 'super' | 'user';
interface Account {
  key: AccountKey;
  label: string;
  password: string;
  userName: string;
}

type LoginParams = Pick<Account, 'password' | 'userName'>;

const INITIAL_VALUES = {
  password: '123456',
  userName: 'Soybean'
};

const PwdLogin = () => {
  const { t } = useTranslation();

  const { loading, toLogin } = useInitAuth();

  const [form] = AForm.useForm<LoginParams>();

  const navigate = useNavigate();

  const {
    formRules: { pwd, userName: userNameRules }
  } = useFormRules();

  const accounts: Account[] = [
    {
      key: 'super',
      label: t('page.login.pwdLogin.superAdmin'),
      password: '123456',
      userName: 'Super'
    },
    {
      key: 'admin',
      label: t('page.login.pwdLogin.admin'),
      password: '123456',
      userName: 'Admin'
    },
    {
      key: 'user',
      label: t('page.login.pwdLogin.user'),
      password: '123456',
      userName: 'User'
    }
  ];

  async function handleSubmit() {
    const params = await form.validateFields();
    toLogin(params);
  }

  function handleAccountLogin(account: Account) {
    toLogin(account);
  }

  function goCodeLogin() {
    navigate('code-login');
  }

  function goRegister() {
    navigate('register');
  }

  function goResetPwd() {
    navigate('reset-pwd');
  }

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.pwdLogin.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
        initialValues={INITIAL_VALUES}
      >
        <AForm.Item
          name="userName"
          rules={userNameRules}
        >
          <Input />
        </AForm.Item>

        <AForm.Item
          name="password"
          rules={pwd}
        >
          <Input.Password autoComplete="password" />
        </AForm.Item>
        <Space
          className="w-full"
          direction="vertical"
          size={24}
        >
          <div className="flex-y-center justify-between">
            <Checkbox>{t('page.login.pwdLogin.rememberMe')}</Checkbox>

            <Button
              type="text"
              onClick={goResetPwd}
            >
              {t('page.login.pwdLogin.forgetPassword')}
            </Button>
          </div>
          <SubmitEnterButton
            block
            loading={loading}
            shape="round"
            size="large"
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </SubmitEnterButton>
          <div className="flex-y-center justify-between gap-12px">
            <Button
              block
              className="flex-1"
              onClick={goCodeLogin}
            >
              {t(loginModuleRecord['code-login'])}
            </Button>
            <Button
              block
              className="flex-1"
              onClick={goRegister}
            >
              {t(loginModuleRecord.register)}
            </Button>
          </div>
          <Divider className="!m-0 !text-14px !text-#666">{t('page.login.pwdLogin.otherAccountLogin')}</Divider>
          <div className="flex-center gap-12px">
            {accounts.map(item => {
              return (
                <Button
                  key={item.key}
                  type="primary"
                  onClick={() => handleAccountLogin(item)}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </Space>
      </AForm>
    </>
  );
};

export const handle = {
  constant: true,
  i18nKey: 'route.(blank)_login',
  title: 'login'
};

export default PwdLogin;
