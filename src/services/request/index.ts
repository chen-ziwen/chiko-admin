import { BACKEND_ERROR_CODE,createFlatRequest,createRequest } from '@chiko-admin/axios';

import { globalConfig } from '@/config';

import { backEndFail, handleError } from './error';
import { getAuthorization } from './shared';
import type { RequestInstanceState } from './type';

// 主服务请求
export const request = createFlatRequest<App.Service.Response, RequestInstanceState>(
  {
    baseURL: globalConfig.serviceBaseURL,
    headers: {}
  },
  {
    isBackendSuccess(response) {
      return String(response.data.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
    },
    async onBackendFail(response, instance) {
      await backEndFail(response, instance, request);
    },
    onError(error) {
      handleError(error, request);
    },
    async onRequest(config) {
      const Authorization = getAuthorization();
      Object.assign(config.headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      return response.data.data;
    }
  }
);

// 其他服务请求 (当一个前端项目需要多个后端服务配合使用时, 可以创建多个请求实例)
export const demoRequest = createRequest<App.Service.DemoResponse>(
  { 
    baseURL: globalConfig.serviceOtherBaseURL.demo
  },
  {
    isBackendSuccess(response) {
      return response.data.status === '200';
    },
    async onBackendFail(_response) {},
    onError(error) {
      let message = error.message;

      if (error.code === BACKEND_ERROR_CODE) {
        message = error.response?.data?.message || message;
      }

      window.$message?.error(message);
    },
    async onRequest(config) {
      const { headers } = config;

      const token = localStg.get('token');
      const Authorization = token ? `Bearer ${token}` : null;
      Object.assign(headers, { Authorization });

      return config;
    },
    transformBackendResponse(response) {
      return response.data.result;
    }
  }
);