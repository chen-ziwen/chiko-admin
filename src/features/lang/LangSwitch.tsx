import ButtonIcon from '@/components/ButtonIcon';

import { useLang } from './langContext';

interface LangSwitchProps {
  className?: string;
  showTooltip?: boolean;
}

const LangSwitch: FC<LangSwitchProps> = memo(({ className, showTooltip = true }) => {
  const { t } = useTranslation(); // 组件中使用 t 来翻译，能够自动响应语言变化

  const { locale, localeOptions, setLocale } = useLang();

  const tooltipContext = showTooltip ? t('icon.lang') : '';

  function changeLocales({ key }: { key: string }) {
    setLocale(key as App.I18n.LangType);
  }

  const menu = {
    items: localeOptions,
    onClick: changeLocales,
    selectedKeys: [locale]
  };

  return (
    <ADropdown menu={menu}>
      <ButtonIcon
        className={className}
        icon="meteor-icons:language"
        tooltipContent={tooltipContext}
        tooltipPlacement="left"
      />
    </ADropdown>
  );
});

export default LangSwitch;
