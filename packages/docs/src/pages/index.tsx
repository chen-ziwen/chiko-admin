import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useEffect } from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  useEffect(() => {
    // 添加粒子效果
    if (typeof window !== 'undefined' && (window as any).particlesJS) {
      (window as any).particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: '#3b82f6'
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#3b82f6',
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      });
    }
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div id="particles-js" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>
            <img src="/img/logo.svg" alt="ChikoAdmin Logo" className={styles.logoImg} />
          </div>
          <Heading as="h1" className="hero__title" style={{ color: '#3b82f6' }}>
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle" style={{ color: '#64748b' }}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--secondary button--lg', styles.quickStartBtn)}
              to="/docs/guide/getting-started">
              快速开始
            </Link>
            <Link
              className={clsx('button button--lg button--primary', styles.githubBtn)}
              to="https://github.com/chen-ziwen/chiko-admin">
              GitHub
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
        <section className={styles.techStack}>
          <div className="container">
            <Heading as="h2" className={styles.sectionTitle}>
              🛠️ 技术栈
            </Heading>
            <div className={styles.techGrid}>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>⚛️</div>
                <h3>React 19</h3>
                <p>最新的 React 框架，支持并发特性和新的 Hooks</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>⚡</div>
                <h3>Vite</h3>
                <p>极速构建工具，提供快速的开发体验</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🔵</div>
                <h3>TypeScript</h3>
                <p>类型安全，更好的开发体验和代码质量</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🎨</div>
                <h3>Ant Design</h3>
                <p>企业级 UI 组件库，丰富的组件和主题</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🎯</div>
                <h3>UnoCSS</h3>
                <p>原子化 CSS 引擎，极致的性能优化</p>
              </div>
              <div className={styles.techItem}>
                <div className={styles.techIcon}>🔄</div>
                <h3>Redux Toolkit</h3>
                <p>现代化的状态管理，简化 Redux 使用</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
