import { Navigate, createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/pages';
import { getAllRoutes, getGlobalRoutes } from '@/router/config';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_ROUTE_HOME} />,
        handle: { constant: true }
      },
      ...getAllRoutes()
    ]
  },
  ...getGlobalRoutes()
]);

export default router;
