/**
 * @handle {
 *   "constant": true
 * }
 */

import { SubmitEnterButton, useFormRules } from '@/features/form';
import { useRouter } from '@/features/router';
import { Form } from 'antd';

const CodeLogin = () => {
  const [form] = Form.useForm();

  const { getCaptcha, isCounting, label, loading } = useCaptcha();

  const { t } = useTranslation();

  const { formRules } = useFormRules();

  const { navigateUp } = useRouter();
  async function handleSubmit() {
    await form.validateFields();

    window.$message?.success(t('page.login.common.validateSuccess'));
  }

  function sendCaptcha() {
    getCaptcha('18159300000');
  }

  return (
    <>
      <h3 className="text-18px text-primary font-medium">{t('page.login.codeLogin.title')}</h3>
      <AForm
        className="pt-24px"
        form={form}
        onFinish={handleSubmit}
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
          <div className="w-full flex-y-center gap-16px">
            <AInput
              placeholder={t('page.login.common.codePlaceholder')}
              v-model:value="model.code"
            />
            <AButton
              disabled={isCounting}
              loading={loading}
              size="large"
              onClick={sendCaptcha}
            >
              {label}
            </AButton>
          </div>
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

export default CodeLogin;
