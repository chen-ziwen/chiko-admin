/**
 * @handle {
 *   "constant": true
 * }
 */

import { SubmitEnterButton, useFormRules } from '@/features/form';
import { useRouter } from '@/features/router';
import { Form } from 'antd';

interface FormModel {
  code: string;
  confirmPassword: string;
  password: string;
  phone: string;
}

const ResetPwd = () => {
  const { t } = useTranslation();

  const [form] = Form.useForm<FormModel>();

  const { navigateUp } = useRouter();

  const { createConfirmPwdRule, formRules } = useFormRules();

  async function handleSubmit() {
    await form.validateFields();

    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.register.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
      >
        <AForm.Item
          name="phone"
          rules={formRules.phone}
        >
          <AInput placeholder={t('page.login.common.phonePlaceholder')} />
        </AForm.Item>
        <AForm.Item
          name="code"
          rules={formRules.code}
        >
          <AInput placeholder={t('page.login.common.codePlaceholder')} />
        </AForm.Item>
        <AForm.Item
          name="password"
          rules={formRules.pwd}
        >
          <AInput.Password
            autoComplete="password"
            placeholder={t('page.login.common.passwordPlaceholder')}
          />
        </AForm.Item>
        <AForm.Item
          name="confirmPassword"
          rules={createConfirmPwdRule(form)}
        >
          <AInput.Password
            autoComplete="confirm-password"
            placeholder={t('page.login.common.confirmPasswordPlaceholder')}
          />
        </AForm.Item>
        <ASpace
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

          <AButton
            block
            shape="round"
            size="large"
            onClick={navigateUp}
          >
            {t('page.login.common.back')}
          </AButton>
        </ASpace>
      </AForm>
    </>
  );
};

export default ResetPwd;
