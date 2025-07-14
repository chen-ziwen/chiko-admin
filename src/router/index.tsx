import { Navigate, createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/pages';
import { homeRoutes } from '@/router/modules/home';
import { loginRoutes } from '@/router/modules/login';
import { personalRoutes } from '@/router/modules/personal';
import { systemRoutes } from '@/router/modules/system';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_ROUTE_HOME} />
      },

      ...loginRoutes,
      ...homeRoutes,
      ...systemRoutes,
      ...personalRoutes
    ]
  }
]);

export default router;
