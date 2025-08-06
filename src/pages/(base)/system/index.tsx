/**
 * @handle {
 *   "icon": "material-symbols-light:settings",
 *   "order": 4,
 *   "roles": ["R_SUPER"]
 * }
 */

import { replace } from 'react-router-dom';

const System = () => {
  return null;
};

export const loader = () => {
  return replace('permission');
};

export default System;
