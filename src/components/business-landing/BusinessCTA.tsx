import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusinessCTAProps {
  onRequestDemo?: () => void;
}

export const BusinessCTA: React.FC<BusinessCTAProps> = ({ onRequestDemo }) => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#0B1736] text-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#079669]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#079669]/20 text-[#079669] border border-[#079669]/30 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Get Started Today</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Ready to Modernize Facility & Issue Operations?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Request a personalized demo for your campus, hospital, corporate office, or industrial plant. Set up QR reporting and AI triage in days.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-[#079669] hover:bg-[#068059] shadow-xl shadow-[#079669]/30 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Schedule Enterprise Consultation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/business/login')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Access Business Portal</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 pt-6">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#079669]" /> Instant Trial Setup
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#079669]" /> No Software Installation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#079669]" /> Dedicated Support Team
          </span>
        </div>
      </div>
    </section>
  );
};
