import { Icon } from '@iconify/react';
import { m } from 'motion/react';

interface SkillItemProps {
  name: string;
  level: number;
  icon: string;
  color: string;
  delay: number;
}

const SkillItem = ({ name, level, icon, color, delay }: SkillItemProps) => {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center rounded-lg p-4 transition-colors space-x-4 hover:bg-gray-50 dark:hover:bg-gray-800"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <div
        className="h-12 w-12 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon
          className="text-2xl"
          icon={icon}
          style={{ color }}
        />
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-gray-800 font-semibold dark:text-gray-200">{name}</span>
          <span className="text-sm text-gray-500">{level}%</span>
        </div>
        <AProgress
          percent={level}
          showInfo={false}
          strokeColor={color}
          strokeWidth={8}
          trailColor="#f0f0f0"
        />
      </div>
    </m.div>
  );
};

export const SkillsSection = () => {
  const frontendSkills = [
    { name: 'React', level: 95, icon: 'logos:react', color: '#61dafb', delay: 0.1 },
    { name: 'Vue.js', level: 88, icon: 'logos:vue', color: '#4fc08d', delay: 0.2 },
    { name: 'TypeScript', level: 92, icon: 'logos:typescript-icon', color: '#3178c6', delay: 0.3 },
    { name: 'Tailwind CSS', level: 90, icon: 'logos:tailwindcss-icon', color: '#06b6d4', delay: 0.4 }
  ];

  const backendSkills = [
    { name: 'Node.js', level: 85, icon: 'logos:nodejs-icon', color: '#339933', delay: 0.1 },
    { name: 'Python', level: 80, icon: 'logos:python', color: '#3776ab', delay: 0.2 },
    { name: 'MongoDB', level: 75, icon: 'logos:mongodb-icon', color: '#47a248', delay: 0.3 },
    { name: 'PostgreSQL', level: 78, icon: 'logos:postgresql', color: '#336791', delay: 0.4 }
  ];

  const toolsSkills = [
    { name: 'Git', level: 90, icon: 'logos:git-icon', color: '#f05032', delay: 0.1 },
    { name: 'Docker', level: 82, icon: 'logos:docker-icon', color: '#2496ed', delay: 0.2 },
    { name: 'AWS', level: 75, icon: 'logos:aws', color: '#ff9900', delay: 0.3 },
    { name: 'Figma', level: 85, icon: 'logos:figma', color: '#f24e1e', delay: 0.4 }
  ];

  const skillCategories = [
    { title: '前端技术', skills: frontendSkills, icon: 'material-symbols:web', color: '#1890ff' },
    { title: '后端技术', skills: backendSkills, icon: 'material-symbols:dns', color: '#52c41a' },
    { title: '工具 & 平台', skills: toolsSkills, icon: 'material-symbols:build', color: '#fa8c16' }
  ];

  return (
    <m.div
      animate={{ opacity: 1, x: 0 }}
      className="h-full"
      initial={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
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
          <ATypography.Title
            className="flex items-center !mb-0"
            level={3}
          >
            <Icon
              className="mr-3 text-purple-500"
              icon="material-symbols:psychology"
            />
            技能矩阵
          </ATypography.Title>

          {skillCategories.map((category, categoryIndex) => (
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              key={category.title}
              transition={{ duration: 0.6, delay: 0.2 * categoryIndex }}
            >
              <ASpace
                className="w-full"
                direction="vertical"
                size="middle"
              >
                <div className="flex items-center">
                  <div
                    className="mr-3 h-8 w-8 flex items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon
                      className="text-lg"
                      icon={category.icon}
                      style={{ color: category.color }}
                    />
                  </div>
                  <ATypography.Title
                    className="!mb-0"
                    level={5}
                    style={{ color: category.color }}
                  >
                    {category.title}
                  </ATypography.Title>
                </div>

                <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                  {category.skills.map(skill => (
                    <SkillItem
                      key={skill.name}
                      {...skill}
                      delay={skill.delay + 0.3 * categoryIndex}
                    />
                  ))}
                </div>
              </ASpace>
            </m.div>
          ))}
        </ASpace>
      </ACard>
    </m.div>
  );
};
