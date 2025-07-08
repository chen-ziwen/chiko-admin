import { RouterProvider as Provider } from 'react-router-dom';

import { reactRouter } from './router';
import { RouterContext } from './routerContext';

export const RouterProvider = () => {
  return (
    <RouterContext value={reactRouter}>
      <Provider router={reactRouter.router} />
    </RouterContext>
  );
};
