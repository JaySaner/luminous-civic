import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBusinessContext } from './BusinessContext';
import { 
  Building2, 
  LayoutDashboard, 
  PlusCircle, 
  Users, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  Globe, 
  Menu, 
  X,
  Sparkles,
  Inbox
} from 'lucide-react';

export const SuperAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { superAdmin, logout } = useBusinessContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/business/login');
  };

  const navItems = [
    { label: 'Platform Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
    { label: 'Enterprise Inquiries', path: '/super-admin/inquiries', icon: Inbox },
    { label: 'Businesses & Tenants', path: '/super-admin/businesses', icon: Building2 },
    { label: 'Onboard New Business', path: '/super-admin/businesses/new', icon: PlusCircle },
    { label: 'Platform Users', path: '/super-admin/users', icon: Users },
    { label: 'Global Issue Feed', path: '/super-admin/issues', icon: AlertCircle },
    { label: 'Platform Analytics', path: '/super-admin/analytics', icon: BarChart3 },
    { label: 'Platform Settings', path: '/super-admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-cyan-500 selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900/90 border-r border-slate-800/80 p-5 sticky top-0 h-screen backdrop-blur-xl z-30">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800/80">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/50">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-lg text-white tracking-tight">Luminous</h1>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">SUPER ADMIN</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">SaaS Tenant Management</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Switch Portal & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 transition border border-slate-700/50"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Civic Platform Portal
            </span>
            <span className="text-[10px] text-slate-500 font-normal">Go →</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out Super Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Header */}
        <header className="sticky top-0 z-20 bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Platform Control Center
              </span>
              <h2 className="text-base font-bold text-white">Super Admin Workspace</h2>
            </div>
          </div>

          {/* User Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white">{superAdmin?.name || 'Super Admin'}</p>
              <p className="text-[11px] text-slate-400">{superAdmin?.email || 'jaysaner2006@gmail.com'}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-950/50 border border-cyan-400/30">
              SA
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    location.pathname === item.path ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/20 text-rose-400 font-semibold"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        )}

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
