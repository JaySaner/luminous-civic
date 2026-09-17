import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBusinessContext } from './BusinessContext';
import { 
  Building2, 
  LayoutDashboard, 
  AlertCircle, 
  FileSpreadsheet, 
  BarChart3, 
  Users, 
  MapPin, 
  Settings, 
  LogOut, 
  Globe, 
  QrCode, 
  Menu, 
  X,
  Sparkles,
  Shield
} from 'lucide-react';

export const BusinessLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { business, businesses, switchBusiness, businessUser, superAdmin, role, logout } = useBusinessContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/business/login');
  };

  const navItems = [
    { label: 'Overview Dashboard', path: '/business/dashboard', icon: LayoutDashboard },
    { label: 'Issues & Reports', path: '/business/issues', icon: AlertCircle },
    { label: 'Public Form Builder', path: '/business/forms/builder', icon: FileSpreadsheet },
    { label: 'Portal Branding & QR', path: '/business/portal-settings', icon: QrCode },
    { label: 'Analytics & SLA', path: '/business/analytics', icon: BarChart3 },
    { label: 'Departments', path: '/business/departments', icon: Building2 },
    { label: 'Locations & Branches', path: '/business/locations', icon: MapPin },
    { label: 'Staff Roster', path: '/business/employees', icon: Users },
    { label: 'Business Settings', path: '/business/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-blue-500 selection:text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-slate-900/90 border-r border-slate-800/80 p-5 sticky top-0 h-screen backdrop-blur-xl z-30">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-800/80">
          {business?.logoUrl ? (
            <img src={business.logoUrl} alt={business.name} className="w-10 h-10 rounded-2xl object-cover border border-slate-700 shadow-md" />
          ) : (
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/50">
              <Building2 className="w-6 h-6" />
            </div>
          )}
          <div className="overflow-hidden">
            <h1 className="font-extrabold text-base text-white truncate">{business?.name || 'Business Portal'}</h1>
            <p className="text-[11px] text-slate-400 font-medium truncate">{business?.industryType || 'Enterprise SaaS'}</p>
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
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Public Link & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <a
            href={`/portal/${business?.slug || 'aissms-coe'}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 text-xs font-semibold text-cyan-400 transition border border-slate-700/50"
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Public Portal Link
            </span>
            <span className="text-[10px] text-slate-500 font-mono">/portal/{business?.slug || 'aissms-coe'}</span>
          </a>

          {role === 'super_admin' && (
            <Link
              to="/super-admin/dashboard"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/20 transition"
            >
              <Shield className="w-4 h-4" /> Super Admin Center
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
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
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Tenant Operations Portal
              </span>
              <h2 className="text-base font-bold text-white">{business?.name || 'Business Workspace'}</h2>
            </div>
          </div>

          {/* User Profile Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white">{businessUser?.name || superAdmin?.name || 'Staff Account'}</p>
              <p className="text-[11px] text-slate-400 font-medium capitalize">{businessUser?.role || 'Admin'} • {businessUser?.email || superAdmin?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-950/50 border border-blue-400/30">
              {(businessUser?.name || superAdmin?.name || 'B').charAt(0)}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 animate-fade-in">
            <a
              href={`/portal/${business?.slug || 'aissms-coe'}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/20"
            >
              <Globe className="w-5 h-5" /> Public Portal Link (/portal/{business?.slug || 'aissms-coe'})
            </a>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
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

        {/* Main Workspace */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
