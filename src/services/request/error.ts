import type { FlatRequestInstance } from '@chiko-admin/axios';
import { BACKEND_ERROR_CODE } from '@chiko-admin/axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { reactRouter } from '@/features/router';
import { $t } from '@/locales';

import { getAuthorization, handleExpiredRequest, showErrorMsg } from './shared';
import type { RequestInstanceState } from './type';

// 后端错误处理
export async function backEndFail(
  response: AxiosResponse<App.Service.Response<unknown>, any>,
  instance: AxiosInstance,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  const responseCode = String(response.data.code);

  function handleLogout() {
    reactRouter.navigate('/login-out');
  }

  function logoutAndCleanup() {
    handleLogout();
    window.removeEventListener('beforeunload', handleLogout);

    request.state.errMsgStack = request.state.errMsgStack.filter(msg => msg !== response.data.msg);
  }

  const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
  if (logoutCodes.includes(responseCode)) {
    handleLogout();
    return null;
  }

  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(responseCode) && !request.state.errMsgStack?.includes(response.data.msg)) {
    request.state.errMsgStack = [...(request.state.errMsgStack || []), response.data.msg];

    window.addEventListener('beforeunload', handleLogout);

    window.$modal?.error({
      content: response.data.msg,
      keyboard: false,
      maskClosable: false,
      okText: $t('common.confirm'),
      afterClose() {
        logoutAndCleanup();
      },
      onOk() {
        logoutAndCleanup();
      },
      title: $t('common.error')
    });

    return null;
  }

  const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
  if (expiredTokenCodes.includes(responseCode)) {
    const success = await handleExpiredRequest(request.state);
    if (success) {
      const Authorization = getAuthorization();
      Object.assign(response.config.headers, { Authorization });

      return instance.request(response.config) as Promise<AxiosResponse>;
    }
  }

  return null;
}

// 网络错误处理
export function handleError(
  error: AxiosError<App.Service.Response<unknown>, any>,
  request: FlatRequestInstance<RequestInstanceState, App.Service.Response<unknown>>
) {
  let message = error.message;
  let backendErrorCode = '';

  if (error.code === BACKEND_ERROR_CODE) {
    message = error.response?.data?.msg || message;
    backendErrorCode = String(error.response?.data?.code || '');
  }

  const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
  if (modalLogoutCodes.includes(backendErrorCode)) {
    return;
  }

  const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
  if (expiredTokenCodes.includes(backendErrorCode)) {
    return;
  }

  showErrorMsg(request.state, message);
}
