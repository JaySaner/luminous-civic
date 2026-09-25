import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LCLogo } from '../main-home/MainNavbar';
import { Building2 } from 'lucide-react';

export const BusinessFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#060D1E] text-slate-400 text-xs border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <LCLogo darkBg />
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#079669]/20 text-[#079669] border border-[#079669]/30">
                Business & Industry
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Enterprise facility issue reporting, QR dispatch, AI triage, and real-time SLA management for modern organizations.
            </p>
            <div className="text-[11px] text-slate-500">
              Part of the Luminous Civic Unified Platform Architecture.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
                <li><a href="#solutions" className="hover:text-white transition-colors">Solutions</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">AI Triage</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Enterprise Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#industries" className="hover:text-white transition-colors">Campuses & Universities</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Hospitals & Healthcare</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Hotels & Hospitality</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">IT Parks & Offices</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Cross Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-white transition-colors font-semibold text-slate-300">
                    Main Landing →
                  </Link>
                </li>
                <li>
                  <Link to="/civic" className="hover:text-[#2447E8] transition-colors">
                    Civic Platform
                  </Link>
                </li>
                <li>
                  <Link to="/business/login" className="hover:text-emerald-400 transition-colors">
                    Business Portal Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Luminous Civic. All rights reserved.
          </div>
          <div>
            Crafted by <span className="font-semibold text-slate-300">Team LUMINA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
