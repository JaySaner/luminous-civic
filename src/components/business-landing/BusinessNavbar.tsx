import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Building2, Shield, QrCode, BarChart3 } from 'lucide-react';
import { LCLogo } from '../main-home/MainNavbar';

interface BusinessNavbarProps {
  onRequestDemo?: () => void;
}

export const BusinessNavbar: React.FC<BusinessNavbarProps> = ({ onRequestDemo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Industries', href: '#industries' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B1736]/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10'
          : 'bg-[#0B1736] py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Platform Badge */}
          <div className="flex items-center gap-3">
            <LCLogo darkBg />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#079669]/20 text-[#079669] border border-[#079669]/30">
              Business & Industry
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/civic"
              className="text-xs font-medium text-slate-400 hover:text-[#2447E8] transition-colors flex items-center gap-1 border-l border-white/10 pl-6"
            >
              Switch to Civic Platform →
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/business/login')}
              className="px-4 py-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onRequestDemo}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#079669] hover:bg-[#068059] shadow-md shadow-[#079669]/20 transition-all duration-200 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B1736] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-300 hover:text-white text-base font-medium py-1"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  to="/civic"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-slate-400 py-1"
                >
                  Switch to Civic Platform
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/business/login');
                  }}
                  className="w-full py-2.5 text-center font-medium text-slate-200 border border-slate-700 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRequestDemo && onRequestDemo();
                  }}
                  className="w-full py-2.5 text-center font-semibold text-white bg-[#079669] rounded-lg shadow"
                >
                  Get Started / Request Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
