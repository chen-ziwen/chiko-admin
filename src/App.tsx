import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/components/ErrorBoundary';
import { AntdAppProvider, AntdConfigProvider } from '@/features/antd';
import { LangProvider } from '@/features/lang';
import { RouterProvider } from '@/features/router';
import { ThemeProvider } from '@/features/theme';
import { StoreProvider } from '@/stores';

import { LazyAnimate } from './features/animate';

function App() {
  return (
    <ErrorBoundary fallbackRender={ErrorPage}>
      <StoreProvider>
        <ThemeProvider>
          <LangProvider>
            <AntdAppProvider>
              <AntdConfigProvider>
                <LazyAnimate>
                  <RouterProvider />
                </LazyAnimate>
              </AntdConfigProvider>
            </AntdAppProvider>
          </LangProvider>
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
}

export default App;
