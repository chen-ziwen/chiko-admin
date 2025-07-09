import { MenuProvider } from '@/features/menu';
import { LayoutComponent } from '@/layouts/layout';

const BasicLayout = () => {
  return (
    <MenuProvider>
      <LayoutComponent />
    </MenuProvider>
  );
};

export default BasicLayout;
