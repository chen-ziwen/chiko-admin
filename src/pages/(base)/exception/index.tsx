/**
 * @handle {
 *  "icon": "ant-design:exception-outlined",
 *  "order": 3
 * }
 */

import { replace } from 'react-router-dom';

const Exception = () => {
  return null;
};

export const loader = () => {
  return replace('404');
};

export default Exception;
