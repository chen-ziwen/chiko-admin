import { authHandlers } from './auth';
import { routeHandlers } from './route';

export const handlers = [
  ...authHandlers,
  ...routeHandlers
];

export { authHandlers, routeHandlers };
