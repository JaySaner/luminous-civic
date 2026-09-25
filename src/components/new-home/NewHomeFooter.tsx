import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NewHomeFooterProps {
  onOpenContact: () => void;
}

export const NewHomeFooter: React.FC<NewHomeFooterProps> = ({ onOpenContact }) => {
  const navigate = useNavigate();

  const handleNavClick = (sectionId?: string) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/new_home" onClick={() => handleNavClick()} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 3.66 1.97 6.86 4.9 8.56.28.16.6.24.91.24.47 0 .93-.18 1.28-.53.59-.59.59-1.54 0-2.13C6.77 15.82 5.5 13.99 5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5c0 1.99-1.27 3.82-3.59 6.14-.59.59-.59 1.54 0 2.13.35.35.81.53 1.28.53.31 0 .63-.08.91-.24C20.03 18.86 22 15.66 22 12c0-5.52-4.48-10-10-10zm0 4c-3.31 0-6 2.69-6 6 0 1.92.9 3.63 2.31 4.74.88-.88 1.69-1.74 2.39-2.58C10.15 13.5 10 12.77 10 12c0-1.1.9-2 2-2s2 .9 2 2c0 .77-.15 1.5-.7 2.16.7.84 1.51 1.7 2.39 2.58C17.1 15.63 18 13.92 18 12c0-3.31-2.69-6-6-6z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight font-headline block">
                  Luminous Civic
                </span>
                <span className="text-xs font-semibold text-emerald-400 block tracking-tight">
                  From Problems to Progress.
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              An AI-powered Report-to-Resolution platform built to streamline civic issues and enterprise operations for cleaner, safer and stronger communities.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Product</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => navigate('/report')} className="hover:text-white transition-colors">
                  For Citizens
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">
                  For Government
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/business/login')} className="hover:text-white transition-colors">
                  For Businesses
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNavClick('why-us')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('impact')} className="hover:text-white transition-colors">
                  Our Impact
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Resources</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => navigate('/track')} className="hover:text-white transition-colors">
                  Track Issue Status
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Help & Support
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Luminous Civic Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Security</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
