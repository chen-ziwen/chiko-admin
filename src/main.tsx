import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/components/ErrorBoundary.tsx';

import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import '@/styles/css/global.css';
import App from './App.tsx';
import { setupI18n } from './locales/index.ts';

function startup() {
  setupI18n();

  const container = document.getElementById('root');

  if (!container) return;

  const root = createRoot(container);

  root.render(
    <ErrorBoundary fallbackRender={ErrorPage}>
      <App />
    </ErrorBoundary>
  );
}

startup();
