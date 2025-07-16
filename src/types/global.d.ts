interface Window {
  /** Ant-design-vue message instance */
  $message?: import('antd/es/message/interface').MessageInstance;
  /** Ant-design-vue modal instance */
  $modal?: Omit<import('antd/es/modal/confirm').ModalStaticFunctions, 'warn'>;
  /** Ant-design-vue notification instance */
  $notification?: import('antd/es/notification/interface').NotificationInstance;
  /** NProgress instance */
  NProgress?: import('nprogress').NProgress;
}

/** Build time of the project */
declare const BUILD_TIME: string;

declare module '~react-pages' {
  import type { RouteObject } from 'react-router-dom';

  const routes: RouteObject[];
  export default routes;
}
