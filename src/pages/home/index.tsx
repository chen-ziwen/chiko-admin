import { ChartsSection } from './modules/ChartsSection';
import { HeroSection } from './modules/HeroSection';
import { PersonalIntro } from './modules/PersonalIntro';
import { SkillsSection } from './modules/SkillsSection';
import { StatisticsCards } from './modules/StatisticsCards';

export default function DashBoard() {
  return (
    <ASpace
      className="w-full"
      direction="vertical"
      size={[16, 16]}
    >
      <HeroSection />

      <StatisticsCards />

      <ARow gutter={[24, 24]}>
        <ACol
          lg={10}
          md={12}
          xs={24}
        >
          <PersonalIntro />
        </ACol>

        <ACol
          lg={14}
          md={12}
          xs={24}
        >
          <SkillsSection />
        </ACol>
      </ARow>

      <ChartsSection />
    </ASpace>
  );
}
