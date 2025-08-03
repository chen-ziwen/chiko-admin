import type { ButtonProps } from 'antd';

const SubmitEnterButton = ({ onClick, ...props }: Omit<ButtonProps, 'onClick'> & { readonly onClick: () => void }) => {
  useKeyPress('enter', () => {
    onClick();
  });

  return (
    <AButton
      onClick={onClick}
      {...props}
    />
  );
};

export default SubmitEnterButton;
