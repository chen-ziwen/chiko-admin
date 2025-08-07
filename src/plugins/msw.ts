let isMSWStarted = false;

export async function setupMSW() {
  if (import.meta.env.VITE_MOCK_MODE === 'msw' && import.meta.env.DEV && !isMSWStarted) {
    const { startMockWorker } = await import('@/mocks/browser');
    await startMockWorker();
    isMSWStarted = true;
  }
}

export async function waitForMSW() {
  if (import.meta.env.DEV && import.meta.env.VITE_MOCK_MODE === 'msw') {
    // 先确保 MSW 已启动
    await setupMSW();

    // 然后等待 MSW 完全就绪
    await new Promise(resolve => {
      const checkMSW = () => {
        if (navigator.serviceWorker.controller?.state === 'activated') {
          console.log('MSW 已就绪，可以开始拦截请求');
          resolve(true);
        } else {
          setTimeout(checkMSW, 100);
        }
      };
      checkMSW();
    });
  }
}
