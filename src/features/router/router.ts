import type { RouterNavigateOptions, To } from 'react-router-dom';

import router from '@/router';

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

  // eslint-disable-next-line max-params
  function push(path: string, query?: LocationQueryRaw, state?: any, _replace?: boolean) {
    let _path = path;

    if (query) {
      const search = stringifyQuery(query);

      _path = `${path}?${search}`;
    }

    router.navigate(_path, { replace: _replace, state });
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
