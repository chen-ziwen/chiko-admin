import { MenuProvider } from '@/features/menu';

import { BasicLayout } from './BaseLayout';

const Index = () => {
  return (
    <MenuProvider>
      <BasicLayout />
    </MenuProvider>
  );
};

export default Index;
