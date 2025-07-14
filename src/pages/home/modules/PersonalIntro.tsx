import { Icon } from '@iconify/react';
import { m } from 'motion/react';

export const PersonalIntro = () => {
  const skills = [
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'Python', level: 80, color: '#3776ab' }
  ];

  const socialLinks = [
    { icon: 'mdi:github', url: '#', color: '#333' },
    { icon: 'mdi:linkedin', url: '#', color: '#0077b5' },
    { icon: 'mdi:twitter', url: '#', color: '#1da1f2' },
    { icon: 'mdi:email', url: '#', color: '#ea4335' }
  ];

  return (
    <m.div
      animate={{ opacity: 1, x: 0 }}
      className="h-full"
      initial={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <ACard
        bodyStyle={{ padding: '32px' }}
        className="h-full border-0 shadow-lg"
      >
        <ASpace
          className="w-full"
          direction="vertical"
          size="large"
        >
          <div className="text-center">
            <m.div
              transition={{ type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
            >
              <AAvatar
                className="mb-4 shadow-lg"
                size={120}
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              />
            </m.div>

            <ATypography.Title
              className="!mb-2"
              level={3}
            >
              张三
            </ATypography.Title>
            <ATypography.Text
              className="text-lg"
              type="secondary"
            >
              全栈开发工程师
            </ATypography.Text>

            <ASpace
              wrap
              className="mt-4"
              size="middle"
            >
              {socialLinks.map((link, index) => (
                <m.a
                  className="h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-all hover:shadow-lg"
                  href={link.url}
                  key={index}
                  style={{ backgroundColor: link.color }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon
                    className="text-lg text-white"
                    icon={link.icon}
                  />
                </m.a>
              ))}
            </ASpace>
          </div>

          <ADivider />

          <div>
            <ATypography.Title
              className="flex items-center !mb-3"
              level={5}
            >
              <Icon
                className="mr-2 text-blue-500"
                icon="material-symbols:person"
              />
              关于我
            </ATypography.Title>
            <ATypography.Paragraph className="text-gray-600 leading-relaxed dark:text-gray-300">
              热爱技术的全栈开发者，专注于现代Web技术栈。
              拥有3年以上的开发经验，擅长Vue、React、Node.js、Electron等技术。 致力于创造优秀的用户体验和高质量的代码。
            </ATypography.Paragraph>
          </div>

          <div>
            <ATypography.Title
              className="flex items-center !mb-3"
              level={5}
            >
              <Icon
                className="mr-2 text-green-500"
                icon="material-symbols:code"
              />
              技能专长
            </ATypography.Title>
            <ASpace
              className="w-full"
              direction="vertical"
              size="middle"
            >
              {skills.map((skill, index) => (
                <m.div
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  key={skill.name}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <m.div
                      animate={{ width: `${skill.level}%` }}
                      className="h-2 rounded-full"
                      initial={{ width: 0 }}
                      style={{ backgroundColor: skill.color }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                </m.div>
              ))}
            </ASpace>
          </div>

          <div>
            <ATypography.Title
              className="flex items-center !mb-3"
              level={5}
            >
              <Icon
                className="mr-2 text-purple-500"
                icon="material-symbols:workspace-premium"
              />
              标签
            </ATypography.Title>
            <ASpace wrap>
              {['React专家', '全栈开发', 'UI/UX', '团队协作', '敏捷开发'].map((tag, index) => (
                <m.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  key={tag}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
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
          </div>
        </ASpace>
      </ACard>
    </m.div>
  );
};
