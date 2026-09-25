import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Building2, Zap } from 'lucide-react';

interface PricingSectionProps {
  onRequestDemo?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onRequestDemo }) => {
  const plans = [
    {
      name: 'Facility Starter',
      desc: 'Ideal for single-building offices, retail stores, or small campuses.',
      features: [
        'Up to 3 Departments (Maintenance, IT, Cleaning)',
        'Unlimited QR Code Generation',
        'Mobile Browser Issue Reporting',
        'Basic SLA Tracking & E-Mail Alerts',
        'Up to 5 Technician Accounts',
      ],
      cta: 'Request Starter Demo',
      highlighted: false,
    },
    {
      name: 'Organization Growth',
      desc: 'For multi-building campuses, hospitals, hotels, and corporate IT parks.',
      features: [
        'Unlimited Departments & Locations',
        'Gemini AI Automatic Issue Triage',
        'Custom Priority SLA Countdown Timers',
        'Automated Escalation Triggers',
        'Executive Analytics & Exportable Reports',
        'Up to 25 Technician Accounts',
      ],
      cta: 'Get Started with Growth',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Custom Enterprise',
      desc: 'Tailored solutions for large industrial footprints, university networks, and healthcare systems.',
      features: [
        'Dedicated On-Premise or Private Cloud option',
        'Custom ERP & Work Order Integrations',
        'Unlimited Technician & Admin Accounts',
        'Custom SLA Guarantees & 24/7 Dedicated Support',
        'Role-Based Single Sign-On (SSO / SAML)',
        'Custom Branding & White-Label Domain Option',
      ],
      cta: 'Contact Enterprise Sales',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Flexible Enterprise Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            Transparent Options Built for Any Scale
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Scale seamlessly from a single facility to enterprise-wide multi-location operations. Contact our sales team for custom deployment quotes.
          </p>
        </div>

        {/* 3 Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col justify-between relative transition-all ${
                plan.highlighted
                  ? 'bg-[#0B1736] text-white ring-2 ring-[#079669] shadow-2xl scale-[1.02]'
                  : 'bg-slate-50 text-slate-900 border border-slate-200 shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#079669] text-white text-xs font-bold shadow">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-[#0B1736]'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mb-6 ${plan.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                  {plan.desc}
                </p>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-[#079669] text-white' : 'bg-[#079669]/10 text-[#079669]'
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={plan.highlighted ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={onRequestDemo}
                  className={`w-full py-3 rounded-xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-[#079669] hover:bg-[#068059] text-white shadow-lg shadow-[#079669]/30'
                      : 'bg-[#0B1736] hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
