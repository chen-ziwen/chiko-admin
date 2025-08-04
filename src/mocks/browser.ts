import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startMockWorker = async () => {
  if (typeof window !== 'undefined') {
    try {
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js'
        }
      });
      console.log('🔶 MSW Mock Service Worker started successfully');
    } catch (error) {
      console.error('❌ Failed to start MSW Mock Service Worker:', error);
    }
  }
};

// 停止 MSW worker
export const stopMockWorker = () => {
  if (typeof window !== 'undefined') {
    worker.stop();
    console.log('🔶 MSW Mock Service Worker stopped');
  }
};
