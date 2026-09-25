import React, { useState } from 'react';
import { BusinessNavbar } from '../components/business-landing/BusinessNavbar';
import { BusinessHero } from '../components/business-landing/BusinessHero';
import { BusinessInterestForm } from '../components/business-landing/BusinessInterestForm';
import { BusinessProblem } from '../components/business-landing/BusinessProblem';
import { BusinessWorkflow } from '../components/business-landing/BusinessWorkflow';
import { QRReporting } from '../components/business-landing/QRReporting';
import { DeptLocationsEmployees } from '../components/business-landing/DeptLocationsEmployees';
import { AITriage } from '../components/business-landing/AITriage';
import { SLASection } from '../components/business-landing/SLASection';
import { BusinessDashboardSection } from '../components/business-landing/BusinessDashboardSection';
import { IndustriesSection } from '../components/business-landing/IndustriesSection';
import { BusinessBenefits } from '../components/business-landing/BusinessBenefits';
import { PricingSection } from '../components/business-landing/PricingSection';
import { SecuritySection } from '../components/business-landing/SecuritySection';
import { BusinessTechStack } from '../components/business-landing/BusinessTechStack';
import { BusinessCTA } from '../components/business-landing/BusinessCTA';
import { BusinessFooter } from '../components/business-landing/BusinessFooter';

export const BusinessLanding: React.FC = () => {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  const handleOpenDemo = () => {
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#079669] selection:text-white">
      <BusinessNavbar onRequestDemo={handleOpenDemo} />
      
      <main>
        <BusinessHero onRequestDemo={handleOpenDemo} />
        <BusinessProblem />
        <BusinessWorkflow />
        <QRReporting />
        <DeptLocationsEmployees />
        <AITriage />
        <SLASection />
        <BusinessDashboardSection />
        <IndustriesSection />
        <BusinessBenefits />
        <PricingSection onRequestDemo={handleOpenDemo} />
        <SecuritySection />
        <BusinessTechStack />
        <BusinessCTA onRequestDemo={handleOpenDemo} />
      </main>

      <BusinessFooter />

      {/* Inquiry / Demo Request Modal */}
      <BusinessInterestForm
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
};

export default BusinessLanding;
