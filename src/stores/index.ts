import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkAction } from '@reduxjs/toolkit';

import { appSlice, authSlice,  routeSlice, tabSlice,themeSlice } from '@/stores/modules';

export { default as StoreProvider } from './storeProvider';

const rootReducer = combineSlices(appSlice, routeSlice, tabSlice, themeSlice, authSlice);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
