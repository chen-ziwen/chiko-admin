/**
 * @handle {
 *   "icon": "lucide:circle-user-round",
 *   "order": 997,
 *   "roles": ["R_ADMIN"]
 * }
 */

import { replace } from 'react-router-dom';

const Personal = () => {
  return null;
};

export const loader = () => {
  return replace('center');
};

export default Personal;
