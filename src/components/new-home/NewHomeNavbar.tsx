import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { useFirebase } from '../../lib/FirebaseProvider';
import { loginWithGoogle, logout } from '../../lib/firebase';

interface NewHomeNavbarProps {
  onOpenContact: () => void;
}

export const NewHomeNavbar: React.FC<NewHomeNavbarProps> = ({ onOpenContact }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useFirebase();
  const navigate = useNavigate();

  const handleNavClick = (sectionId?: string) => {
    setIsMobileMenuOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo Left */}
        <Link to="/new_home" onClick={() => handleNavClick()} className="flex items-center gap-3 group">
          {/* Leaf / Civic Icon */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 3.66 1.97 6.86 4.9 8.56.28.16.6.24.91.24.47 0 .93-.18 1.28-.53.59-.59.59-1.54 0-2.13C6.77 15.82 5.5 13.99 5.5 12c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5c0 1.99-1.27 3.82-3.59 6.14-.59.59-.59 1.54 0 2.13.35.35.81.53 1.28.53.31 0 .63-.08.91-.24C20.03 18.86 22 15.66 22 12c0-5.52-4.48-10-10-10zm0 4c-3.31 0-6 2.69-6 6 0 1.92.9 3.63 2.31 4.74.88-.88 1.69-1.74 2.39-2.58C10.15 13.5 10 12.77 10 12c0-1.1.9-2 2-2s2 .9 2 2c0 .77-.15 1.5-.7 2.16.7.84 1.51 1.7 2.39 2.58C17.1 15.63 18 13.92 18 12c0-3.31-2.69-6-6-6z" />
            </svg>
          </div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tight font-headline block leading-tight">
              Luminous Civic
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 block tracking-tight -mt-0.5">
              From Problems to Progress.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => handleNavClick()}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('platforms')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            For Citizens
          </button>
          <button
            onClick={() => handleNavClick('platforms')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            For Government
          </button>
          <button
            onClick={() => handleNavClick('platforms')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            For Businesses
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('impact')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Impact
          </button>
          <button
            onClick={() => handleNavClick('why-us')}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={onOpenContact}
            className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons Right */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-700">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-6 h-6 rounded-full" />
                ) : (
                  <User size={16} className="text-blue-600" />
                )}
                <span className="truncate max-w-[120px]">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button
                onClick={() => logout()}
                className="text-xs font-bold text-slate-500 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithGoogle()}
              className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors px-3 py-2"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => navigate('/report')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 px-6 py-6 space-y-4 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-3 font-semibold text-slate-700">
              <button onClick={() => handleNavClick()} className="text-left py-2 hover:text-blue-600">Home</button>
              <button onClick={() => handleNavClick('platforms')} className="text-left py-2 hover:text-blue-600">For Citizens & Government</button>
              <button onClick={() => handleNavClick('platforms')} className="text-left py-2 hover:text-blue-600">For Businesses & Industries</button>
              <button onClick={() => handleNavClick('how-it-works')} className="text-left py-2 hover:text-blue-600">How It Works</button>
              <button onClick={() => handleNavClick('impact')} className="text-left py-2 hover:text-blue-600">Impact</button>
              <button onClick={() => handleNavClick('why-us')} className="text-left py-2 hover:text-blue-600">About</button>
              <button onClick={() => { setIsMobileMenuOpen(false); onOpenContact(); }} className="text-left py-2 hover:text-blue-600">Contact</button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              {!user ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); loginWithGoogle(); }}
                  className="w-full py-3 border border-slate-200 rounded-full font-bold text-slate-700 text-sm text-center"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); logout(); }}
                  className="w-full py-3 border border-red-200 rounded-full font-bold text-red-600 text-sm text-center"
                >
                  Sign Out ({user.displayName?.split(' ')[0]})
                </button>
              )}
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate('/report'); }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-full text-sm text-center shadow-lg shadow-blue-600/20"
              >
                Get Started Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
