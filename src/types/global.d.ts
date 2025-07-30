interface Window {
  $message?: import('antd/es/message/interface').MessageInstance;
  $modal?: Omit<import('antd/es/modal/confirm').ModalStaticFunctions, 'warn'>;
  $notification?: import('antd/es/notification/interface').NotificationInstance;
  NProgress?: import('nprogress').NProgress;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Build time of the project */
declare const BUILD_TIME: string;
