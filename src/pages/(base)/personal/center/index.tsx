/**
 * @handle {
 *   "icon": "lucide:user-star",
 *   "keepAlive": true
 * }
 */

import { redirect } from 'react-router-dom';

const PersonalCenter = () => {
  return null;
};

export const loader = () => {
  return redirect('/user-center');
};

export default PersonalCenter;
