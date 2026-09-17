// ============================================================
// Luminous Civic — Business Portal Route Guard
// Restricts access to Business Portal pages (/business/*)
// ============================================================

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useBusinessContext } from './BusinessContext';
import { Loader2 } from 'lucide-react';

export const BusinessRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, loading } = useBusinessContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-200">
        <Loader2 className="w-10 h-10 animate-spin text-blue-400 mb-4" />
        <p className="text-sm text-slate-400 font-medium">Loading Business Portal Workspace...</p>
      </div>
    );
  }

  if (role !== 'business_user' && role !== 'super_admin') {
    return <Navigate to="/business/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
