import { createRoot } from 'react-dom/client';

import './plugins/assets.ts';
import App from './App.tsx';
import { setupI18n } from './locales/index.ts';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupMSW, setupNProgress } from './plugins';

async function startup() {
  await setupMSW();

  setupI18n();

  const container = document.getElementById('root');

  if (!container) {
    return;
  }

  const root = createRoot(container);

  root.render(<App />);

  setupDayjs();

  setupIconifyOffline();

  setupNProgress();

  setupAppVersionNotification();
}

startup();
