import { authHandlers } from './auth';
import { systemHandlers } from './system';
import { routeHandlers } from './route';

export const handlers = [
  ...authHandlers,
  ...systemHandlers,
  ...routeHandlers
];

export { authHandlers, systemHandlers, routeHandlers };
