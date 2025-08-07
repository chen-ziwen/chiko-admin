import NProgress from 'nprogress';

export function setupNProgress() {
  NProgress.configure({ easing: 'ease', speed: 500 });

  window.NProgress = NProgress;
}
