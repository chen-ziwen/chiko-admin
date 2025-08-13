import { addColorAlpha, transformColorWithOpacity } from '@chiko-admin/color';

import type { PageTabCssVars, PageTabCssVarsProps } from '../../types';

/** The active color of the tab */
export const ACTIVE_COLOR = '#1890ff';

function createCssVars(props: PageTabCssVarsProps) {
  const cssVars: PageTabCssVars = {
    '--cka-primary-color': props.primaryColor,
    '--cka-primary-color-opacity1': props.primaryColorOpacity1,
    '--cka-primary-color-opacity2': props.primaryColorOpacity2,
    '--cka-primary-color-opacity3': props.primaryColorOpacity3,
    '--cka-primary-color1': props.primaryColor1,
    '--cka-primary-color2': props.primaryColor2
  };

  return cssVars;
}

export function createTabCssVars(primaryColor: string) {
  const cssProps: PageTabCssVarsProps = {
    primaryColor,
    primaryColor1: transformColorWithOpacity(primaryColor, 0.1, '#ffffff'),
    primaryColor2: transformColorWithOpacity(primaryColor, 0.3, '#000000'),
    primaryColorOpacity1: addColorAlpha(primaryColor, 0.1),
    primaryColorOpacity2: addColorAlpha(primaryColor, 0.15),
    primaryColorOpacity3: addColorAlpha(primaryColor, 0.3)
  };

  return createCssVars(cssProps);
}
