import { AdminLayout, LAYOUT_SCROLL_EL_ID, type LayoutMode } from '@chiko-admin/layout';
import { configResponsive, useResponsive } from 'ahooks';
import type { FC } from 'react';
import { Suspense, memo, useLayoutEffect } from 'react';

import {
  LAYOUT_MODE_HORIZONTAL,
  LAYOUT_MODE_HORIZONTAL_MIX,
  LAYOUT_MODE_VERTICAL,
  LAYOUT_MODE_VERTICAL_MIX
} from '@/constants/common';
import { useMixMenuContext } from '@/features/menu';
import MenuProvider from '@/features/menu/MenuProvider';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutMenu,
  LayoutSider,
  LayoutTabbar,
  ThemeDrawer
} from '@/layouts/modules';
import {
  getFullContent,
  getMixSiderFixed,
  getSiderCollapse,
  getThemeSettings,
  setIsMobile,
  setLayoutMode,
  setSiderCollapse
} from '@/stores/modules';

configResponsive({ small: 640 });

interface LayoutWithMenuContextProps {
  fullContent: boolean;
  headerHeight: number;
  isHorizontalMix: boolean;
  isMobile: boolean;
  isVerticalMix: boolean;
  layoutMode: LayoutMode;
  mixSiderFixed: boolean;
  siderCollapse: boolean;
  siderCollapsedWidth: number;
  siderVisible: boolean;
  siderWidth: number;
  themeSettings: any; // 可以替换为实际的 themeSettings 类型
  updateSiderCollapse: () => void;
}

const LayoutWithMenuContextComponent: FC<LayoutWithMenuContextProps> = props => {
  const {
    fullContent,
    headerHeight,
    isMobile,
    isHorizontalMix,
    isVerticalMix,
    layoutMode,
    mixSiderFixed,
    siderCollapse,
    siderCollapsedWidth,
    siderVisible,
    siderWidth,
    themeSettings,
    updateSiderCollapse
  } = props;

  const { isActiveFirstLevelMenuHasChildren, childLevelMenus } = useMixMenuContext();

  function getAdjustedSiderWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;
    const { mixChildMenuWidth, width } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? width : 0;
    }

    let w = siderWidth;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }

  function getAdjustedSiderCollapsedWidth() {
    const { reverseHorizontalMix } = themeSettings.layout;
    const { collapsedWidth, mixChildMenuWidth } = themeSettings.sider;

    if (isHorizontalMix && reverseHorizontalMix) {
      return isActiveFirstLevelMenuHasChildren ? collapsedWidth : 0;
    }

    let w = siderCollapsedWidth;

    if (isVerticalMix && mixSiderFixed && childLevelMenus.length) {
      w += mixChildMenuWidth;
    }

    return w;
  }

  const adjustedSiderWidth = getAdjustedSiderWidth();
  const adjustedSiderCollapsedWidth = getAdjustedSiderCollapsedWidth();

  return (
    <AdminLayout
      fixedFooter={themeSettings.footer.fixed}
      fixedTop={themeSettings.fixedHeaderAndTab}
      Footer={<LayoutFooter />}
      footerHeight={themeSettings.footer.height}
      footerVisible={themeSettings.footer.visible}
      fullContent={fullContent}
      headerHeight={headerHeight}
      isMobile={isMobile}
      mode={layoutMode}
      rightFooter={themeSettings.footer.right}
      scrollElId={LAYOUT_SCROLL_EL_ID}
      scrollMode={themeSettings.layout.scrollMode}
      siderCollapse={siderCollapse}
      siderCollapsedWidth={adjustedSiderCollapsedWidth}
      siderVisible={siderVisible}
      siderWidth={adjustedSiderWidth}
      Tab={<LayoutTabbar />}
      tabHeight={themeSettings.tab.height}
      tabVisible={themeSettings.tab.visible}
      updateSiderCollapse={updateSiderCollapse}
      Header={
        <LayoutHeader
          isMobile={isMobile}
          mode={themeSettings.layout.mode}
          reverse={themeSettings.layout.reverseHorizontalMix}
          siderWidth={themeSettings.sider.width}
        />
      }
      Sider={
        <LayoutSider
          headerHeight={themeSettings.header.height}
          inverted={themeSettings.sider.inverted}
          isHorizontalMix={isHorizontalMix}
          isVerticalMix={isVerticalMix}
          siderCollapse={siderCollapse}
        />
      }
    >
      <LayoutContent />

      <LayoutMenu
        mode={themeSettings.layout.mode}
        reverse={themeSettings.layout.reverseHorizontalMix}
      />

      <Suspense fallback={null}>
        <ThemeDrawer />
      </Suspense>
    </AdminLayout>
  );
};

const LayoutWithMenuContext = memo(LayoutWithMenuContextComponent);
LayoutWithMenuContext.displayName = 'LayoutWithMenuContext';

const BasicLayout: FC = () => {
  const dispatch = useAppDispatch();

  const themeSettings = useAppSelector(getThemeSettings);

  const fullContent = useAppSelector(getFullContent);

  const responsive = useResponsive();

  const siderCollapse = useAppSelector(getSiderCollapse);

  const mixSiderFixed = useAppSelector(getMixSiderFixed);

  const siderVisible = themeSettings.layout.mode !== LAYOUT_MODE_HORIZONTAL;
  const isVerticalMix = themeSettings.layout.mode === LAYOUT_MODE_VERTICAL_MIX;
  const isHorizontalMix = themeSettings.layout.mode === LAYOUT_MODE_HORIZONTAL_MIX;
  const layoutMode = themeSettings.layout.mode.includes(LAYOUT_MODE_VERTICAL)
    ? LAYOUT_MODE_VERTICAL
    : LAYOUT_MODE_HORIZONTAL;

  const isMobile = !responsive.small;

  function getSiderWidth() {
    const { mixWidth, width } = themeSettings.sider;

    const w = isVerticalMix || isHorizontalMix ? mixWidth : width;

    return w;
  }

  const siderWidth = getSiderWidth();

  function getSiderCollapsedWidth() {
    const { collapsedWidth, mixCollapsedWidth } = themeSettings.sider;

    const w = isVerticalMix || isHorizontalMix ? mixCollapsedWidth : collapsedWidth;

    return w;
  }
  const siderCollapsedWidth = getSiderCollapsedWidth();

  function updateSiderCollapse() {
    dispatch(setSiderCollapse(true));
  }

  useLayoutEffect(() => {
    dispatch(setIsMobile(isMobile));
    if (isMobile) {
      dispatch(setLayoutMode('vertical'));
    }
  }, [isMobile, dispatch]);

  return (
    <MenuProvider>
      <LayoutWithMenuContext
        fullContent={fullContent}
        headerHeight={themeSettings.header.height}
        isHorizontalMix={isHorizontalMix}
        isMobile={isMobile}
        isVerticalMix={isVerticalMix}
        layoutMode={layoutMode as LayoutMode}
        mixSiderFixed={mixSiderFixed}
        siderCollapse={siderCollapse}
        siderCollapsedWidth={siderCollapsedWidth}
        siderVisible={siderVisible}
        siderWidth={siderWidth}
        themeSettings={themeSettings}
        updateSiderCollapse={updateSiderCollapse}
      />
    </MenuProvider>
  );
};

export default BasicLayout;
