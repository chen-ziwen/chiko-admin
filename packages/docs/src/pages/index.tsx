import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <img src="/img/logo.svg" alt="ChikoAdmin Logo" className={styles.logoImg} />
          </div>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro">
              快速开始
            </Link>
            <Link
              className="button button--lg button--primary"
              to="https://github.com/chen-ziwen/chiko-admin">
              GitHub 仓库 🚀
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 现代化中后台管理模板`}
      description="基于 React19、Vite、TypeScript、Ant Design 和 UnoCSS 的清新优雅的中后台管理模板">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.techStack}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              技术栈
            </Heading>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>⚛️</div>
                <h3>React 19</h3>
                <p>最新的 React 框架</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>⚡</div>
                <h3>Vite</h3>
                <p>极速构建工具</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🔷</div>
                <h3>TypeScript</h3>
                <p>类型安全</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🎨</div>
                <h3>Ant Design</h3>
                <p>企业级 UI 组件</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🎯</div>
                <h3>UnoCSS</h3>
                <p>原子化 CSS</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🔄</div>
                <h3>Redux Toolkit</h3>
                <p>状态管理</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
