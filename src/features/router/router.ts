import type { RouterNavigateOptions, To } from 'react-router-dom';

import { router } from '@/router';

import { type LocationQueryRaw, stringifyQuery } from './query';

function navigator() {
  async function navigate(path: To | null, options?: RouterNavigateOptions) {
    router.navigate(path, options);
  }

  function back() {
    router.navigate(-1);
  }

  function forward() {
    router.navigate(1);
  }

  function go(delta: number) {
    router.navigate(delta);
  }

  function replace(path: To) {
    router.navigate(path, { replace: true });
  }

  function reload() {
    router.navigate(0);
  }

  function navigateUp() {
    router.navigate('..');
  }

  function goHome() {
    router.navigate('/');
  }

  function push(path: string, query?: LocationQueryRaw, state?: any, shouldReplace?: boolean) {
    let fullPath = path;

    if (query) {
      const search = stringifyQuery(query);

      fullPath = `${path}?${search}`;
    }

    router.navigate(fullPath, { replace: shouldReplace, state });
  }

  return {
    router,
    back,
    forward,
    go,
    goHome,
    navigate,
    navigateUp,
    push,
    reload,
    replace
  };
}

export const reactRouter = navigator();

export type RouterContextType = ReturnType<typeof navigator>;
