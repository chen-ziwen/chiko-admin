import { openThemeDrawer } from '@/stores/modules';

const ThemeButton = memo(() => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(openThemeDrawer());
  }

  return (
    <ButtonIcon
      triggerParent
      className="px-12px"
      icon="icon-park-outline:theme"
      tooltipContent={t('icon.themeConfig')}
      onClick={handleClick}
    />
  );
});

export default ThemeButton;
