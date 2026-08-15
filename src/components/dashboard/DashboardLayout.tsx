import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, LogOut, Bell, Search, Menu, X, Home as HomeIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SidebarItemProps {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
        : "text-on-surface-variant/60 hover:bg-surface-container-low hover:text-on-surface"
    )}
  >
    <Icon size={22} className={cn("transition-transform group-hover:scale-110", active ? "text-white" : "text-primary")} />
    <span className="font-bold text-sm tracking-wide">{label}</span>
  </button>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'reports', label: 'My Reports', icon: FileText, path: '/dashboard' },
    { id: 'track', label: 'Track Case', icon: Search, path: '/track' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.path && item.path !== '/dashboard') {
      navigate(item.path);
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col overflow-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-on-surface/50 backdrop-blur-sm z-[100] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-[101] md:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <button onClick={() => navigate('/')} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl civic-pulse-gradient flex items-center justify-center text-white shadow-lg">
                    <LayoutDashboard size={24} />
                  </div>
                  <h1 className="text-xl font-extrabold font-headline tracking-tighter text-on-surface">Luminous Civic</h1>
                </button>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-surface-container-low rounded-full">
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4 flex-1">
                <SidebarItem 
                  icon={HomeIcon}
                  label="Back to Home"
                  onClick={() => navigate('/')}
                />
                {navItems.map((item) => (
                  <SidebarItem 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => {
                      handleNavClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
              </nav>

              <div className="pt-8 border-t border-outline-variant">
                <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jay" alt="User" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">Jay Saner</p>
                    <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Premium Citizen</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 md:h-24 bg-white/80 backdrop-blur-md border-b border-outline-variant px-4 md:px-12 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4 md:gap-8 flex-1">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
            >
              <Menu size={24} />
            </button>

            <button onClick={() => navigate('/')} className="flex items-center gap-3 md:mr-8">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl civic-pulse-gradient flex items-center justify-center text-white shadow-lg">
                <LayoutDashboard size={20} className="md:hidden" />
                <LayoutDashboard size={24} className="hidden md:block" />
              </div>
              <h1 className="text-lg md:text-xl font-extrabold font-headline tracking-tighter text-on-surface whitespace-nowrap">Luminous Civic</h1>
            </button>
            
            <nav className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-full font-bold text-sm transition-all text-on-surface-variant hover:bg-surface-container-low flex items-center gap-2"
              >
                <HomeIcon size={16} />
                Home
              </button>
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2",
                    activeTab === item.id ? "bg-primary text-white" : "text-on-surface-variant hover:bg-surface-container-low"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="relative max-w-md w-full group ml-auto hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search reports..."
                className="w-full bg-surface-container-low border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6 ml-4 md:ml-8">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-bold text-on-surface">Jay Saner</p>
              <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest">Premium Citizen</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-container-low border-2 border-white shadow-sm overflow-hidden p-1">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jay" 
                alt="Profile" 
                className="w-full h-full rounded-lg md:rounded-xl object-cover"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-12 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};
