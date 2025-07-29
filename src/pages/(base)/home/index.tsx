import { m } from 'motion/react';

import AboutSection from './modules/AboutSection';
import CardData from './modules/CardData';
import HeaderBanner from './modules/HeaderBanner';
import LineChart from './modules/LineChart';
import PieChart from './modules/PieChart';
import RecentActivity from './modules/RecentActivity';

export default function DashBoard() {
  return (
    <m.div
      animate={{ opacity: 1 }}
      className="w-full pb-24px"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ASpace
        className="w-full"
        direction="vertical"
        size={24}
      >
        <HeaderBanner />

        <CardData />

        <ARow gutter={[24, 24]}>
          <ACol
            lg={16}
            span={24}
          >
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LineChart />
            </m.div>
          </ACol>
          <ACol
            lg={8}
            span={24}
          >
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PieChart />
            </m.div>
          </ACol>
        </ARow>

        <ARow gutter={[24, 24]}>
          <ACol
            lg={8}
            span={24}
          >
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <AboutSection />
            </m.div>
          </ACol>
          <ACol
            lg={16}
            span={24}
          >
            <m.div
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <RecentActivity />
            </m.div>
          </ACol>
        </ARow>
      </ASpace>
    </m.div>
  );
}
