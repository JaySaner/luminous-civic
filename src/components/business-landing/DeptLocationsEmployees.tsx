import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Layers, ShieldCheck, MapPin, Wrench, Zap, Cpu, ArrowRight } from 'lucide-react';

export const DeptLocationsEmployees: React.FC = () => {
  const departments = [
    { name: 'Electrical & Power', count: '14 Active Techs', icon: Zap },
    { name: 'HVAC & Climate Control', count: '8 Active Techs', icon: Cpu },
    { name: 'Plumbing & Water', count: '10 Active Techs', icon: Wrench },
    { name: 'IT & AV Systems', count: '18 Active Techs', icon: Layers },
    { name: 'Housekeeping & Sanitation', count: '25 Active Techs', icon: Building2 },
    { name: 'Facility Security', count: '12 Active Guards', icon: ShieldCheck },
  ];

  const roles = [
    { role: 'Organization Super Admin', desc: 'Full enterprise control across all locations, departments & global SLAs' },
    { role: 'Department Manager', desc: 'Manages team assignments, reviews SLA compliance & approves work completion' },
    { role: 'Field Technician', desc: 'Receives instant mobile alerts, updates status & uploads resolution photo proof' },
    { role: 'Staff / Resident User', desc: 'Scans QR codes, submits tickets & tracks real-time progress updates' },
  ];

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#079669]/10 text-[#079669] text-xs font-semibold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Multi-Location & Role Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1736] tracking-tight">
            Built for Complex Organizational Structures
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Whether you operate a single 10-story tower or 50 retail locations nationwide, Luminous Civic maps seamlessly to your operational hierarchy.
          </p>
        </div>

        {/* 2 Column Layout: Left = Departments, Right = Role Hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Department Routing */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#0B1736] flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#079669]" />
                Automated Department Routing
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Issues are instantly routed to designated department queues based on AI triage or QR location tags.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {departments.map((dept, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#079669]/10 text-[#079669] flex items-center justify-center shrink-0">
                    <dept.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{dept.name}</div>
                    <div className="text-[10px] text-slate-500">{dept.count}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#079669] shrink-0" />
              <span>Custom department creation & custom dispatch rules available for all plans.</span>
            </div>
          </div>

          {/* Right Column: Roles & Governance */}
          <div className="lg:col-span-6 bg-[#0B1736] p-6 sm:p-8 rounded-2xl text-white space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2447E8]" />
                Role-Based Permission Matrix
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Granular security controls ensure technicians see only assigned work orders while executive managers maintain full oversight.
              </p>
            </div>

            <div className="space-y-3">
              {roles.map((r, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{r.role}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Role Configured
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">{r.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 pt-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Supports Multi-Branch, Multi-Region & Multi-Tenant Data Isolation.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
