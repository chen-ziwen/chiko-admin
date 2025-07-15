import { createRootRoutes } from '@/router/core';

import { globalExceptionRoutes } from './exception';
import { globalLoginRoutes } from './login';

export const globalRoutes = createRootRoutes([...globalExceptionRoutes, ...globalLoginRoutes]);
