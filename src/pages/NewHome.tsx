import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NewHomeNavbar } from '../components/new-home/NewHomeNavbar';
import { NewHomeHero } from '../components/new-home/NewHomeHero';
import { NewHomeMetrics } from '../components/new-home/NewHomeMetrics';
import { PlatformCards } from '../components/new-home/PlatformCards';
import { HowItWorks } from '../components/new-home/HowItWorks';
import { AIIntelligence } from '../components/new-home/AIIntelligence';
import { ImpactSection } from '../components/new-home/ImpactSection';
import { WhoWeServe } from '../components/new-home/WhoWeServe';
import { WhyLuminousCivic } from '../components/new-home/WhyLuminousCivic';
import { NewHomeCTA } from '../components/new-home/NewHomeCTA';
import { NewHomeFooter } from '../components/new-home/NewHomeFooter';
import { VideoModal } from '../components/new-home/VideoModal';
import { ContactModal } from '../components/new-home/ContactModal';

export const NewHome: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* Standalone Navbar */}
      <NewHomeNavbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Landing Page Sections */}
      <main>
        {/* Section 2 & 3: Hero & Hero Visual */}
        <NewHomeHero onOpenVideo={() => setIsVideoOpen(true)} />

        {/* Section 4: Metrics */}
        <NewHomeMetrics />

        {/* Section 5: Two Core Platforms (Citizens & Govt + Business) */}
        <PlatformCards />

        {/* Section 6: How It Works */}
        <HowItWorks />

        {/* Section 7: AI Intelligence */}
        <AIIntelligence />

        {/* Section 8: Our Impact */}
        <ImpactSection />

        {/* Section 9: Who We Serve */}
        <WhoWeServe />

        {/* Section 10 & 11: Why Luminous Civic & Report-Resolve-Learn Flywheel */}
        <WhyLuminousCivic />

        {/* Section 12: Final CTA */}
        <NewHomeCTA onOpenContact={() => setIsContactOpen(true)} />
      </main>

      {/* Standalone Footer */}
      <NewHomeFooter onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </motion.div>
  );
};
