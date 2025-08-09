import { Icon } from '@iconify/react';
import type { CSSProperties } from 'react';

import { globalConfig } from '@/config';

interface Props {
  readonly className?: string;
  readonly icon?: string;
  readonly localIcon?: string;
  readonly style?: CSSProperties;
}

const defaultLocalIcon = 'no-icon';
const symbolId = (localIcon: string = defaultLocalIcon) => {
  const iconName = localIcon || defaultLocalIcon;

  return `#${globalConfig.localIconPrefix}-${iconName}`;
};

const SvgIcon = ({ icon, localIcon, ...props }: Props) => {
  return localIcon || !icon ? (
    <svg
      height="1em"
      width="1em"
      {...props}
      aria-hidden="true"
    >
      <use
        fill="currentColor"
        href={symbolId(localIcon)}
      />
    </svg>
  ) : (
    <Icon
      icon={icon}
      {...props}
    />
  );
};

export default SvgIcon;
