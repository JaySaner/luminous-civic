import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../lib/FirebaseProvider';
import { loginWithGoogle, logout } from '../lib/firebase';
import { LogOut, User as UserIcon, Menu, X, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageProvider';

const ADMIN_EMAIL = 'jaysaner2006@gmail.com';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useFirebase();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleStartReporting = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToReport: true } });
    } else {
      document.getElementById('report')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('dashboard'), path: '/dashboard' },
    { name: t('track'), path: '/track' },
    ...(isAdmin ? [{ name: '🔒 Admin', path: '/admin' }] : []),
  ];

  // Hide global navbar on dashboard to avoid double headers
  if (location.pathname === '/dashboard') return null;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-[0_40px_60px_-15px_rgba(25,28,30,0.06)]">
      <div className="flex justify-between items-center h-20 px-6 md:px-8 max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 font-headline">
          Luminous Civic
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 mr-4 border-r border-outline-variant pr-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-bold transition-colors duration-200",
                  location.pathname === link.path 
                    ? "text-primary" 
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-full border border-outline-variant">
            {[
              { id: 'en', label: 'EN' },
              { id: 'hi', label: 'हिन्दी' },
              { id: 'mr', label: 'मराठी' }
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as any)}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold transition-all",
                  language === lang.id ? "bg-primary text-white shadow-sm" : "text-on-surface-variant hover:bg-white/50"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <UserIcon size={16} />
                  </div>
                )}
                <span className="text-sm font-bold text-on-surface truncate max-w-[100px]">
                  {user.displayName?.split(' ')[0]}
                </span>
              </div>
              <button 
                onClick={() => logout()}
                className="text-on-surface-variant hover:text-error transition-colors p-2"
                title={t('logout')}
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => loginWithGoogle()}
              className="text-sm font-bold text-primary hover:text-primary-container transition-colors"
            >
              {t('signIn')}
            </button>
          )}

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartReporting}
            className="civic-pulse-gradient text-white px-8 py-3 rounded-full font-bold shadow-lg"
          >
            {t('startReporting')}
          </motion.button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full border border-outline-variant mr-2">
            {['en', 'hi', 'mr'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang as any)}
                className={cn(
                  "w-8 h-8 rounded-full text-[10px] font-bold flex items-center justify-center transition-all",
                  language === lang ? "bg-primary text-white shadow-sm" : "text-on-surface-variant"
                )}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-outline-variant shadow-xl md:hidden overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl font-bold transition-all",
                      location.pathname === link.path 
                        ? "bg-primary/10 text-primary" 
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    )}
                  >
                    {link.name}
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>

              <div className="pt-6 border-t border-outline-variant space-y-4">
                {user ? (
                  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-3">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || ''} className="w-10 h-10 rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          <UserIcon size={20} />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-on-surface">{user.displayName}</p>
                        <p className="text-xs text-on-surface-variant">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="p-2 text-error hover:bg-error/10 rounded-full transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      loginWithGoogle();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 rounded-2xl bg-surface-container-low text-primary font-bold text-center"
                  >
                    Sign In with Google
                  </button>
                )}

                <button 
                  onClick={handleStartReporting}
                  className="w-full py-4 rounded-2xl civic-pulse-gradient text-white font-bold shadow-lg"
                >
                  Start Reporting
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
