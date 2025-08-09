/**
 * @handle {
 *   "icon": "lucide:menu"
 * }
 */

import { redirect } from 'react-router-dom';

const First = () => {
  return null;
};

export const loader = () => {
  return redirect('child');
};

export default First;
