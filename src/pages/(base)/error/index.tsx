/**
 * @handle {
 *  "icon": "icon-park-outline:abnormal",
 *  "order": 3
 * }
 */

import { replace } from 'react-router-dom';

const Exception = () => {
  return null;
};

export const loader = () => {
  return replace('403');
};

export default Exception;
