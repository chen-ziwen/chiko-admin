import DarkModeContainer from '@/components/DarkModeContainer';

export const LayoutFooter: FC<PropsWithChildren> = () => {
  return (
    <DarkModeContainer className="h-full flex items-center justify-center">
      <a
        href="https://github.com/chen-ziwen/chiko-admin"
        rel="noopener noreferrer"
        target="_blank"
      >
        Copyright MIT © 2025 Chiko
      </a>
    </DarkModeContainer>
  );
};
