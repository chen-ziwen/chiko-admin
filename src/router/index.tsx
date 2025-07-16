import { createBrowserRouter } from 'react-router-dom';

// import AppLayout from '@/pages';
// import { getAllRoutes, getGlobalRoutes } from '@/router/config';

import routes from '~react-pages';

const router = createBrowserRouter(routes);

export default router;

console.log('router ===>', routes, router);
