/**
 * @handle {
 *   "icon": "material-symbols-light:person",
 *   "keepAlive": true
 * }
 */

import { replace } from 'react-router-dom';

const User = () => {
  return null;
};

export const loader = () => {
  return replace('list');
};

export default User;
