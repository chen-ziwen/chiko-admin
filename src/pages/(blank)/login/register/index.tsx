import { Button, Form, Input, Space } from 'antd';

import { SubmitEnterButton, useFormRules } from '@/features/form';
import { useRouter } from '@/features/router';

interface FormModel {
  code: string;
  confirmPassword: string;
  password: string;
  phone: string;
}

const Register = () => {
  const { t } = useTranslation();

  const { getCaptcha, isCounting, label, loading } = useCaptcha();

  const { navigateUp } = useRouter();

  const [form] = Form.useForm<FormModel>();

  const { createConfirmPwdRule, formRules } = useFormRules();

  async function handleSubmit() {
    const params = await form.validateFields();
    console.log(params);

    // request to reset password
    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  function sendCaptcha() {
    getCaptcha('17260711111');
  }

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.register.title')}</h3>
      <Form
        className="pt-24px"
        form={form}
      >
        <Form.Item
          name="phone"
          rules={formRules.phone}
        >
          <Input placeholder={t('page.login.common.phonePlaceholder')} />
        </Form.Item>
        <Form.Item
          name="code"
          rules={formRules.code}
        >
          <div className="w-full flex-y-center gap-16px">
            <Input placeholder={t('page.login.common.codePlaceholder')} />
            <Button
              disabled={isCounting}
              loading={loading}
              size="large"
              onClick={sendCaptcha}
            >
              {label}
            </Button>
          </div>
        </Form.Item>
        <Form.Item
          name="password"
          rules={formRules.pwd}
        >
          <Input placeholder={t('page.login.common.passwordPlaceholder')} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={createConfirmPwdRule(form)}
        >
          <Input placeholder={t('page.login.common.confirmPasswordPlaceholder')} />
        </Form.Item>
        <Space
          className="w-full"
          direction="vertical"
          size={18}
        >
          <SubmitEnterButton
            block
            shape="round"
            size="large"
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </SubmitEnterButton>

          <Button
            block
            shape="round"
            size="large"
            onClick={navigateUp}
          >
            {t('page.login.common.back')}
          </Button>
        </Space>
      </Form>
    </>
  );
};

export const handle = {
  constant: true,
  i18nKey: 'route.(blank)_login_register',
  title: 'login_register'
};

export default Register;
