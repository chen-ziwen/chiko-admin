import { m } from 'motion/react';

export const HeroSection = () => {
  return (
    <m.div
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl from-indigo-600 via-purple-600 to-pink-600 bg-gradient-to-r p-8 text-white shadow-2xl md:p-16"
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 h-60 w-60 translate-x-1/3 translate-y-1/3 rounded-full bg-white" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <m.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ATypography.Title
            className="text-4xl font-bold leading-tight !mb-6 md:text-6xl !text-white"
            level={1}
          >
            现代化管理平台
          </ATypography.Title>
        </m.div>

        <m.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ATypography.Paragraph className="mb-10 max-w-3xl text-xl leading-relaxed md:text-2xl !text-white/90">
            集数据可视化、智能分析、系统监控于一体的现代化管理平台。
            <br />
            让数据驱动决策，让管理更加高效。
          </ATypography.Paragraph>
        </m.div>

        <m.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <ASpace
            wrap
            size="middle"
          >
            <AButton
              className="border-white bg-white px-10 py-3 text-lg text-indigo-600 font-bold shadow-lg hover:bg-indigo-50 hover:text-indigo-700"
              size="large"
              type="primary"
            >
              立即开始
            </AButton>
            <AButton
              ghost
              className="border-2 border-white px-10 py-3 text-lg text-white font-bold backdrop-blur-sm hover:bg-white/20"
              size="large"
            >
              查看演示
            </AButton>
          </ASpace>
        </m.div>
      </div>

      {/* Floating Elements */}
      <m.div
        className="absolute right-20 top-20 hidden h-16 w-16 rounded-lg bg-white/20 lg:block"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      <m.div
        className="absolute bottom-20 left-20 hidden h-12 w-12 rounded-full bg-white/20 lg:block"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
    </m.div>
  );
};
