import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: React.ReactNode;
  link?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '现代化技术栈',
    icon: '⚛️',
    description: (
      <>
        基于 React19、Vite、TypeScript 等最新技术栈，提供优秀的开发体验和性能表现。
      </>
    ),
    link: '/docs/guide/getting-started'
  },
  {
    title: '路由系统',
    icon: '🛣️',
    description: (
      <>
        基于文件系统的约定式路由，支持动态路由、路由守卫、页面缓存等功能。
      </>
    ),
    link: '/docs/guide/router'
  },
  {
    title: '菜单管理',
    icon: '📋',
    description: (
      <>
        灵活的菜单配置系统，支持多级菜单、权限控制、图标配置等。
      </>
    ),
    link: '/docs/guide/menu'
  },
  {
    title: '主题系统',
    icon: '🎨',
    description: (
      <>
        完整的主题系统，支持明暗主题切换、主题色定制、布局模式切换。
      </>
    ),
    link: '/docs/guide/theme'
  },
  {
    title: '权限管理',
    icon: '🔐',
    description: (
      <>
        基于角色的权限控制系统，支持路由权限、菜单权限、按钮权限等。
      </>
    ),
    link: '/docs/guide/getting-started'
  },
  {
    title: '开发体验',
    icon: '⚡',
    description: (
      <>
        热更新、类型检查、代码规范、提交规范等，提供优秀的开发体验。
      </>
    ),
    link: '/docs/guide/installation'
  }
];

function Feature({title, icon, description, link}: FeatureItem) {
  const content = (
    <div className="padding-horiz--md text--center">
      <div className={styles.featureIcon}>{icon}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className={styles.featureLink}>
        {content}
      </Link>
    );
  }

  return content;
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <div key={idx} className={clsx('col col--4', styles.featureCol)}>
              <Feature {...props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
