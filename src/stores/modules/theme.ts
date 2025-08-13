import { getPaletteColorByNumber } from '@chiko-admin/color';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { initThemeSettings, toggleAuxiliaryColorModes, toggleGrayscaleMode } from '@/features/theme/shared';
import { themeSettings } from '@/theme/settings';
import type { AppThunk } from '@/stores';
import { localStg } from '@/utils/storage';

interface InitialStateType {
  settings: App.Theme.ThemeSetting;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
  ? DeepPartial<U>[]
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : DeepPartial<T[P]>;
};

const initialState: InitialStateType = {
  settings: initThemeSettings()
};

export const themeSlice = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    changeReverseHorizontalMix(state, { payload }: PayloadAction<boolean>) {
      state.settings.layout.reverseHorizontalMix = payload;
    },

    resetTheme() {
      localStg.remove('themeSettings');
      return {
        settings: themeSettings
      };
    },
    setColourWeakness(state, { payload }: PayloadAction<boolean>) {
      toggleAuxiliaryColorModes(payload);
      state.settings.colourWeakness = payload;
    },

    setFixedHeaderAndTab(state, { payload }: PayloadAction<boolean>) {
      state.settings.fixedHeaderAndTab = payload;
    },
    setFooter(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['footer']>>) {
      Object.assign(state.settings.footer, payload);
    },
    setGrayscale(state, { payload }: PayloadAction<boolean>) {
      toggleGrayscaleMode(payload);
      state.settings.grayscale = payload;
    },
    setHeader(state, { payload }: PayloadAction<DeepPartial<App.Theme.ThemeSetting['header']>>) {
      Object.assign(state.settings.header, payload);
    },
    setIsInfoFollowPrimary(state, { payload }: PayloadAction<boolean>) {
      state.settings.isInfoFollowPrimary = payload;
    },
    setIsOnlyExpandCurrentParentMenu(state, { payload }: PayloadAction<boolean>) {
      state.settings.isOnlyExpandCurrentParentMenu = payload;
    },
    setLayoutMode(state, { payload }: PayloadAction<UnionKey.ThemeLayoutMode>) {
      state.settings.layout.mode = payload;
    },
    setLayoutScrollMode(state, { payload }: PayloadAction<UnionKey.ThemeScrollMode>) {
      state.settings.layout.scrollMode = payload;
    },
    setPage(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['page']>>) {
      Object.assign(state.settings.page, payload);
    },
    setRecommendColor(state, { payload }: PayloadAction<boolean>) {
      state.settings.recommendColor = payload;
    },
    setSider(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['sider']>>) {
      Object.assign(state.settings.sider, payload);
    },
    setSiderInverted(state, { payload }: PayloadAction<boolean>) {
      state.settings.sider.inverted = payload;
    },
    setTab(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['tab']>>) {
      Object.assign(state.settings.tab, payload);
    },

    setWatermark(state, { payload }: PayloadAction<Partial<App.Theme.ThemeSetting['watermark']>>) {
      Object.assign(state.settings.watermark, payload);
    },
    updateThemeColors(
      state,
      { payload: { color, key } }: PayloadAction<{ color: string; key: App.Theme.ThemeColorKey }>
    ) {
      let colorValue = color;

      if (state.settings.recommendColor) {
        colorValue = getPaletteColorByNumber(color, 500, true);
      }

      if (key === 'primary') {
        state.settings.themeColor = colorValue;
      } else {
        state.settings.otherColor[key] = colorValue;
      }
    }
  },
  selectors: {
    getThemeSettings: theme => theme.settings
  }
});

export const { getThemeSettings } = themeSlice.selectors;

export const {
  changeReverseHorizontalMix,
  resetTheme,
  setColourWeakness,
  setFixedHeaderAndTab,
  setFooter,
  setGrayscale,
  setHeader,
  setIsInfoFollowPrimary,
  setIsOnlyExpandCurrentParentMenu,
  setLayoutMode,
  setLayoutScrollMode,
  setPage,
  setRecommendColor,
  setSider,
  setSiderInverted,
  setTab,
  setWatermark,
  updateThemeColors
} = themeSlice.actions;

export const themeColors = createSelector([getThemeSettings], ({ isInfoFollowPrimary, otherColor, themeColor }) => {
  const colors: App.Theme.ThemeColor = {
    primary: themeColor,
    ...otherColor,
    info: isInfoFollowPrimary ? themeColor : otherColor.info
  };
  return colors;
});

export const settingsJson = createSelector([getThemeSettings], settings => {
  return JSON.stringify(settings);
});

export const cacheThemeSettings = (): AppThunk => (_, getState) => {
  localStg.set('themeSettings', getThemeSettings(getState()));
};
