import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Search } from 'lucide-react';

interface MainNavbarProps {
  variant?: 'main' | 'business';
}

import { LCLogo } from '../common/LCLogo';
export { LCLogo };

export const MainNavbar: React.FC<MainNavbarProps> = ({ variant = 'main' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Civic Platform', href: '/civic' },
    { label: 'Business Platform', href: '/business-platform' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Solutions', href: '/#platforms' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between gap-4">
        {/* Logo */}
        <LCLogo />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate('/track')}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-all"
          >
            <Search size={14} />
            Track Report
          </button>
          {variant === 'business' && (
            <button
              onClick={() => navigate('/business/login')}
              className="px-4 py-2 text-sm font-semibold border rounded-lg transition-all"
              style={{ color: '#2447E8', borderColor: '#2447E8', background: '#EEF3FF' }}
            >
              Business Login
            </button>
          )}
          <button
            onClick={() => navigate(variant === 'business' ? '/business-platform' : '/civic')}
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white rounded-lg shadow-sm hover:shadow-md transition-all"
            style={{ background: '#2447E8' }}
          >
            {variant === 'business' ? 'Request Access' : 'Get Started'}
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 px-4 pb-6 overflow-hidden"
          >
            <div className="pt-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate('/track'); }}
                className="w-full py-3 px-4 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl text-center"
              >
                Track Report
              </button>
              {variant === 'business' && (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/business/login'); }}
                  className="w-full py-3 px-4 text-sm font-bold rounded-xl text-center"
                  style={{ color: '#2447E8', background: '#EEF3FF' }}
                >
                  Business Login
                </button>
              )}
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate(variant === 'business' ? '/business-platform' : '/civic'); }}
                className="w-full py-3 px-4 text-sm font-bold text-white rounded-xl text-center"
                style={{ background: '#2447E8' }}
              >
                {variant === 'business' ? 'Request Business Access' : 'Get Started'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
