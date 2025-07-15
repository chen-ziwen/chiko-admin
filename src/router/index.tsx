import { Navigate, createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/pages';
import { getAllRoutes } from '@/router/config';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Navigate to={import.meta.env.VITE_ROUTE_HOME} />
      },
      ...getAllRoutes()
    ]
  }
]);

export default router;
