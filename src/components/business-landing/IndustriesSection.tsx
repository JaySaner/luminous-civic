import React from 'react';
import { motion } from 'motion/react';
import { Building2, GraduationCap, Stethoscope, Hotel, Factory, ShoppingBag, Home, Landmark, Check } from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    {
      icon: GraduationCap,
      title: 'Campuses & Universities',
      desc: 'Dormitory maintenance, classroom projector/HVAC issues, lab equipment & campus security.',
      points: ['Dorm QR codes', 'Student & faculty access', 'Lab hazard priority'],
      badgeColor: 'bg-indigo-50 text-[#2447E8] border-indigo-200',
    },
    {
      icon: Stethoscope,
      title: 'Hospitals & Healthcare',
      desc: 'Biomedical equipment, sanitation alerts, ward climate control & emergency maintenance.',
      points: ['Strict SLA rules', 'Sanitation verification', 'High-priority routing'],
      badgeColor: 'bg-emerald-50 text-[#079669] border-emerald-200',
    },
    {
      icon: Hotel,
      title: 'Hotels & Hospitality',
      desc: 'Guest room maintenance, pool & gym facilities, kitchen appliances & housekeeping requests.',
      points: ['Guest QR scanning', 'Discreet staff dispatch', 'VIP SLA tracking'],
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      icon: Factory,
      title: 'Manufacturing & Plants',
      desc: 'Assembly line machinery breakdown, safety hazards, electrical panels & plant facilities.',
      points: ['Machine asset QR', 'Downtime cost reduction', 'Compliance logs'],
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: ShoppingBag,
      title: 'Retail & Shopping Malls',
      desc: 'Escalator failures, washroom sanitation, storefront lighting & common area maintenance.',
      points: ['Tenant portal access', 'Common area QR', 'Vendor dispatch'],
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      icon: Home,
      title: 'Real Estate & Gated Communities',
      desc: 'Resident amenity booking, elevator issues, plumbing leaks & community security.',
      points: ['Resident mobile app', 'Gatepass integration', 'Maintenance fee logs'],
      badgeColor: 'bg-teal-50 text-[#079669] border-teal-200',
    },
  ];

  return (
    <section id="industries" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Tailored Industry Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            Designed for Organizations of Every Scale
          </h2>
          <p className="mt-4 text-base text-slate-600">
            From single-building campuses to multi-city industrial footprints, Luminous Civic adapts to your specific operational environment.
          </p>
        </div>

        {/* 6 Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#0B1736] mb-4">
                  <ind.icon className="w-6 h-6 text-[#2447E8]" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1736] mb-2">{ind.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{ind.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-200 space-y-1.5">
                {ind.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-[#079669]/10 text-[#079669] flex items-center justify-center text-[10px] shrink-0 font-bold">
                      ✓
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
