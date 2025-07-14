import { Icon } from '@iconify/react';
import { m } from 'motion/react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  delay: number;
}

const ProjectCard = ({ title, description, image, tags, githubUrl, demoUrl, delay }: ProjectCardProps) => {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <ACard
        bodyStyle={{ padding: 0 }}
        className="h-full overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
        cover={
          <div className="relative h-48 overflow-hidden">
            <m.img
              alt={title}
              className="h-full w-full object-cover"
              src={image}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 from-black/50 to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 hover:opacity-100" />
          </div>
        }
      >
        <ASpace
          className="w-full p-6"
          direction="vertical"
          size="middle"
        >
          <ATypography.Title
            className="!mb-0"
            level={4}
          >
            {title}
          </ATypography.Title>
          <ATypography.Paragraph className="line-clamp-3 text-gray-600 !mb-0 dark:text-gray-300">
            {description}
          </ATypography.Paragraph>

          <ASpace wrap>
            {tags.map((tag, index) => (
              <m.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                key={tag}
                transition={{ duration: 0.3, delay: delay + 0.1 * index }}
              >
                <ATag
                  className="border-0 rounded-full px-3 py-1"
                  color="blue"
                >
                  {tag}
                </ATag>
              </m.div>
            ))}
          </ASpace>

          <ASpace>
            <AButton
              className="flex-1"
              href={githubUrl}
              icon={<Icon icon="material-symbols:code" />}
              target="_blank"
              type="primary"
            >
              源码
            </AButton>
            <AButton
              className="flex-1"
              href={demoUrl}
              icon={<Icon icon="material-symbols:open-in-new" />}
              target="_blank"
            >
              预览
            </AButton>
          </ASpace>
        </ASpace>
      </ACard>
    </m.div>
  );
};

export const ProjectsSection = () => {
  const projects = [
    {
      title: 'React Admin Dashboard',
      description:
        '基于React + TypeScript + Ant Design构建的现代化管理后台系统，包含用户管理、权限控制、数据可视化等功能。采用响应式设计，支持暗黑模式。',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
      tags: ['React', 'TypeScript', 'Ant Design', 'ECharts'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.1
    },
    {
      title: 'Vue3 电商平台',
      description:
        '使用Vue3 + Vite + Element Plus开发的电商平台前端，包含商品展示、购物车、订单管理等核心功能。集成了支付系统和物流追踪。',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      tags: ['Vue3', 'Vite', 'Element Plus', 'Pinia'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.2
    },
    {
      title: 'Node.js API服务',
      description:
        'RESTful API服务，使用Node.js + Express + MongoDB构建。包含用户认证、文件上传、数据缓存等功能。支持Docker部署和CI/CD。',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop',
      tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.3
    },
    {
      title: 'React Native App',
      description:
        '跨平台移动应用，使用React Native开发。包含用户登录、消息推送、地图定位等功能。支持iOS和Android双平台。',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
      tags: ['React Native', 'Redux', 'AsyncStorage'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.4
    },
    {
      title: 'Python数据分析',
      description:
        '使用Python + Pandas + Matplotlib进行数据分析和可视化的项目。包含数据清洗、统计分析、图表生成等功能。',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      tags: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.5
    },
    {
      title: 'Flutter跨平台应用',
      description: '使用Flutter开发的跨平台应用，具有精美的UI设计和流畅的动画效果。支持多语言和主题切换功能。',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop',
      tags: ['Flutter', 'Dart', 'Provider', 'Firebase'],
      githubUrl: '#',
      demoUrl: '#',
      delay: 0.6
    }
  ];

  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size="large"
    >
      <m.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <ATypography.Title
          className="flex items-center"
          level={2}
        >
          <Icon
            className="mr-3 text-purple-500"
            icon="material-symbols:work"
          />
          项目展示
        </ATypography.Title>
        <ATypography.Paragraph className="text-lg text-gray-600 dark:text-gray-300">
          这里展示了我参与开发的一些项目，涵盖了前端、后端、移动端等多个领域。
        </ATypography.Paragraph>
      </m.div>

      <ARow gutter={[24, 24]}>
        {projects.map((project, index) => (
          <ACol
            key={index}
            lg={8}
            md={12}
            xs={24}
          >
            <ProjectCard {...project} />
          </ACol>
        ))}
      </ARow>

      <m.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <AButton
          className="px-8"
          icon={<Icon icon="material-symbols:arrow-forward" />}
          size="large"
          type="primary"
        >
          查看更多项目
        </AButton>
      </m.div>
    </ASpace>
  );
};
