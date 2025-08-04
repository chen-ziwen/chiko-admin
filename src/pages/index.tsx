/**
 * @handle {
 *  "icon": "ant-design:exception-outlined",
 *  "constant": true
 * }
 */

import { Navigate } from 'react-router-dom';

import { globalConfig } from '@/config';

const Index = () => {
  return (
    <Navigate
      replace
      to={globalConfig.homePath}
    />
  );
};

export default Index;
