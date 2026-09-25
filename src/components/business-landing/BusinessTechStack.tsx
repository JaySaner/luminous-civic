import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Database, Zap, Sparkles, Layers, QrCode } from 'lucide-react';

export const BusinessTechStack: React.FC = () => {
  const stackItems = [
    { name: 'React 19 + TypeScript', sub: 'High-performance UI architecture', icon: Cpu, color: 'text-[#2447E8]' },
    { name: 'Firebase Cloud DB', sub: 'Multi-tenant real-time sync & security rules', icon: Database, color: 'text-amber-500' },
    { name: 'Gemini AI Engine', sub: 'Automated multimodal issue classification', icon: Sparkles, color: 'text-indigo-400' },
    { name: 'QR Code Generator', sub: 'Dynamic location metadata tagging', icon: QrCode, color: 'text-[#079669]' },
  ];

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Enterprise Architecture
          </div>
          <h3 className="text-xl font-bold text-[#0B1736]">Powered by Modern Cloud & AI Standards</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackItems.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{item.name}</div>
                <div className="text-[10px] text-slate-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
