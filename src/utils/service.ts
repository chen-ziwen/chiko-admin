export function createServiceConfig(env: Env.ImportMeta) {
  const { VITE_SERVICE_BASE_URL } = env;

  const config: App.Service.ServiceConfig = {
    baseURL: VITE_SERVICE_BASE_URL,
    other: [],
    proxyPattern: createProxyPattern()
  };

  config.other.forEach((item) => {
    if (item.key) {
      config.proxyPattern = createProxyPattern(item.key);
    }
  });

  return config;
}

export function getServiceBaseURL(env: Env.ImportMeta, isProxy: boolean) {
  const { baseURL } = createServiceConfig(env);

  const otherBaseURL = {} as Record<App.Service.OtherBaseURLKey, string>;

  // 如果是 MSW 模式，直接返回空字符串作为 baseURL，让 MSW 拦截请求
  const isMSWMode = env.VITE_MOCK_MODE === 'msw';
  const finalBaseURL = isMSWMode ? '' : (isProxy ? createProxyPattern() : baseURL);

  return {
    baseURL: finalBaseURL,
    otherBaseURL
  };
}

function createProxyPattern(key?: App.Service.OtherBaseURLKey) {
  if (!key) {
    return '/proxy-default';
  }

  return `/proxy-${key}`;
}
