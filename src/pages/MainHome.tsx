import React from 'react';
import { MainNavbar } from '../components/main-home/MainNavbar';
import { MainHero } from '../components/main-home/MainHero';
import { TwoPlatforms } from '../components/main-home/TwoPlatforms';
import { TheProblem } from '../components/main-home/TheProblem';
import { CoreWorkflow } from '../components/main-home/CoreWorkflow';
import { MultipleStakeholders } from '../components/main-home/MultipleStakeholders';
import { TraditionalVsLuminous } from '../components/main-home/TraditionalVsLuminous';
import { TechStack } from '../components/main-home/TechStack';
import { MainCTA } from '../components/main-home/MainCTA';
import { MainFooter } from '../components/main-home/MainFooter';

export const MainHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#2447E8] selection:text-white">
      <MainNavbar />
      <main>
        <MainHero />
        <TwoPlatforms />
        <TheProblem />
        <CoreWorkflow />
        <MultipleStakeholders />
        <TraditionalVsLuminous />
        <TechStack />
        <MainCTA />
      </main>
      <MainFooter />
    </div>
  );
};

export default MainHome;
