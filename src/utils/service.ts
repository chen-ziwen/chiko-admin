import json5 from 'json5';

function createProxyPattern(key?: App.Service.OtherBaseURLKey) {
  if (!key) {
    return '/proxy-default';
  }

  return `/proxy-${key}`;
}

export function createServiceConfig(env: Env.ImportMeta) {
  const { VITE_OTHER_SERVICE_BASE_URL, VITE_SERVICE_BASE_URL } = env;

  let other = {} as Record<App.Service.OtherBaseURLKey, string>;
  try {
    other = json5.parse(VITE_OTHER_SERVICE_BASE_URL);
  } catch {
    console.error('VITE_OTHER_SERVICE_BASE_URL is not a valid JSON string');
  }

  const httpConfig: App.Service.SimpleServiceConfig = {
    baseURL: VITE_SERVICE_BASE_URL, 
    other
  };

  const otherHttpKeys = Object.keys(httpConfig.other) as App.Service.OtherBaseURLKey[];

  const otherConfig: App.Service.OtherServiceConfigItem[] = otherHttpKeys.map(key => {
    return {
      baseURL: httpConfig.other[key],
      key,
      proxyPattern: createProxyPattern(key)
    };
  });

  const config: App.Service.ServiceConfig = {
    baseURL: httpConfig.baseURL,
    other: otherConfig, 
    proxyPattern: createProxyPattern()
  };

  return config;
}

export function getServiceBaseURL(env: Env.ImportMeta, isProxy: boolean) {
  const isMSWMode = env.VITE_MOCK_MODE === 'msw';
  
  // MSW 模式下不需要代理，且会拦截所有服务请求
  if (isMSWMode) {
    const { other } = createServiceConfig(env);
    
    // 兼容其他服务配置
    const otherBaseURL = {} as Record<App.Service.OtherBaseURLKey, string>;
    other.forEach(item => {
      otherBaseURL[item.key] = '';
    });
    
    return {
      baseURL: '',
      otherBaseURL
    };
  }
  
  // 非 MSW 模式下，使用原有的代理逻辑
  const { baseURL, other, proxyPattern } = createServiceConfig(env);
  
  const otherBaseURL = {} as Record<App.Service.OtherBaseURLKey, string>;
  other.forEach(item => {
    otherBaseURL[item.key] = isProxy ? item.proxyPattern : item.baseURL;
  });

  return {
    baseURL: isProxy ? proxyPattern : baseURL,
    otherBaseURL
  };
}