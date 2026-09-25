import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LCLogo } from './MainNavbar';

export const MainFooter: React.FC = () => {
  const navigate = useNavigate();

  const footerCols = [
    {
      heading: 'Platform',
      links: [
        { label: 'Civic Platform', to: '/civic' },
        { label: 'Business Platform', to: '/business-platform' },
        { label: 'How It Works', to: '/#how-it-works' },
      ],
    },
    {
      heading: 'Solutions',
      links: [
        { label: 'Citizens & Government', to: '/civic' },
        { label: 'Businesses & Industries', to: '/business-platform' },
        { label: 'Organizations', to: '/business-platform' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Track Report', to: '/track' },
        { label: 'Business Login', to: '/business/login' },
        { label: 'Live Demo', to: '/civic' },
      ],
    },
  ];

  const handleLink = (to: string) => {
    if (to.startsWith('/#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(to);
    }
  };

  return (
    <footer style={{ background: '#0B1736' }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand col */}
          <div className="lg:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <LCLogo darkBg />
            </div>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              An AI-powered Report-to-Resolution platform for cleaner cities, safer communities and stronger organizations.
            </p>

            <p className="text-xs text-white/30 font-semibold">
              Team LUMINA · AISSMS College of Engineering, Pune
            </p>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.heading} className="space-y-4">
              <h4 className="text-xs font-black text-white uppercase tracking-widest">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => handleLink(link.to)}
                      className="text-sm font-medium transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} Luminous Civic. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
