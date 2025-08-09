/**
 * @handle {
 *  "constant": true
 * }
 */

import ExceptionBase from '@/components/ExceptionBase';

const NotAuth = () => {
  return <ExceptionBase type="403" />;
};

export default NotAuth;
