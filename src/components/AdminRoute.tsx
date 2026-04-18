import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseProvider';

const ADMIN_EMAIL = 'jaysaner2006@gmail.com';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
