import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd/lib/tooltip';
import React from 'react';

type BeyondHidingProps = Omit<TooltipProps, 'open' | 'trigger'> & {
  className?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
};

// 给菜单的 label 移入展示 tooltip 的功能
const BeyondHiding = ({ className, style, title, ...props }: BeyondHidingProps) => {
  const [isShow, setIsShow] = useState(false);

  const contentRef = useRef<HTMLSpanElement>(null);

  const isShowTooltip = (): void => {
    if (contentRef.current && contentRef.current.parentElement) {
      const spanWidth = contentRef.current.offsetWidth;
      const parentWidth = contentRef.current.parentElement.offsetWidth;

      if (spanWidth > parentWidth) {
        setIsShow(true);
      }
    }
  };
  return (
    <Tooltip
      open={isShow}
      title={title}
      {...props}
    >
      <span
        className={className}
        ref={contentRef}
        style={style}
        onMouseLeave={() => setIsShow(false)}
        onMouseOver={isShowTooltip}
      >
        {title}
      </span>
    </Tooltip>
  );
};

export default BeyondHiding;
