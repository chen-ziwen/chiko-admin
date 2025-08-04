import { createRoot } from 'react-dom/client';

import 'virtual:uno.css';
import 'virtual:svg-icons-register';
import '@/styles/css/global.css';
import App from './App.tsx';
import { setupI18n } from './locales/index.ts';

async function startup() {
  if (import.meta.env.VITE_MOCK_MODE === 'msw' && import.meta.env.DEV) {
    const { startMockWorker } = await import('./mocks/browser');
    await startMockWorker();
  }

  setupI18n();

  const container = document.getElementById('root');

  if (!container) {
    return;
  }

  const root = createRoot(container);

  root.render(<App />);
}

startup();
