import { Icon } from '@iconify/react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';

import avatar from '@/assets/images/chiko.jpg';

interface Feature {
  id: number;
  icon: string;
  title: string;
}

const AboutSection = () => {
  const { t } = useTranslation();

  const features: Feature[] = [
    {
      id: 1,
      icon: 'logos:react',
      title: 'React 19'
    },
    {
      id: 2,
      icon: 'logos:typescript-icon',
      title: 'TypeScript'
    },
    {
      id: 3,
      icon: 'logos:ant-design',
      title: 'Ant Design'
    },
    {
      id: 4,
      icon: 'logos:unocss',
      title: 'Uno CSS'
    }
  ];

  return (
    <ACard
      className="h-full overflow-hidden rounded-xl shadow-md"
      title={t('page.home.aboutSection.title')}
      variant="borderless"
      styles={{
        body: {
          height: '344px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <div className="relative flex-1">
        <div className="absolute h-40 w-40 rounded-full from-primary/20 to-primary/5 bg-gradient-to-br -right-10 -top-10" />
        <div className="absolute h-40 w-40 rounded-full from-primary/20 to-primary/5 bg-gradient-to-tr -bottom-12 -left-12" />

        <m.div
          animate={{ opacity: 1, y: 0 }}
          className="relative h-full flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-3 flex flex-col items-center">
            <AAvatar
              alt="avatar"
              className="mb-2 size-14 border-4 border-white shadow-lg"
              shape="circle"
              src={avatar}
            />
            <m.div
              animate={{ opacity: 1, y: 0 }}
              className="w-full text-center"
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <ATypography.Title
                className="mb-1 text-center"
                level={4}
              >
                {t('system.title')}
              </ATypography.Title>
            </m.div>

            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <ATypography.Paragraph className="mb-3 text-center text-sm">
                {t('page.home.aboutSection.description')}
              </ATypography.Paragraph>
            </m.div>
          </div>

          <m.div
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="grid grid-cols-2 mb-3 gap-3">
              {features.map((feature, index) => (
                <m.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 10 }}
                  key={feature.id}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 border border-gray-100 rounded-lg p-2 shadow-sm dark:border-gray-800">
                    <div
                      className="h-7 w-7 flex items-center justify-center rounded-md"
                    >
                      <Icon
                        className="text-lg"
                        icon={feature.icon}
                      />
                    </div>
                    <span className="text-sm font-medium">{feature.title}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>

          <m.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <ASpace size={12}>
              <a
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors dark:bg-gray-800 hover:bg-primary/10 dark:text-gray-300 hover:text-primary"
                href="https://github.com/chen-ziwen/chiko-admin"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  className="text-lg"
                  icon="mdi:github"
                />
                <span>GitHub</span>
              </a>
              <a
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors dark:bg-gray-800 hover:bg-primary/10 dark:text-gray-300 hover:text-primary"
                href="https://admin-docs.chiko.store"
                rel="noreferrer"
                target="_blank"
              >
                <Icon
                  className="text-lg"
                  icon="mdi:book-open-page-variant"
                />
                <span>文档</span>
              </a>
            </ASpace>
          </m.div>
        </m.div>
      </div>
    </ACard>
  );
};

export default AboutSection;
