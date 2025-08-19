/**
 * @handle {
 *   "icon": "line-md:cog-loop",
 *   "order": 998,
 *   "roles": ["R_ADMIN"]
 * }
 */

import { replace } from 'react-router-dom';

const System = () => {
  return null;
};

export const loader = () => {
  return replace('user');
};

export default System;
