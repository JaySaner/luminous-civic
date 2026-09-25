import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Track } from './pages/Track';
import { ReportDetail } from './pages/ReportDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { MainHome } from './pages/MainHome';
import { BusinessLanding } from './pages/BusinessLanding';
import { AdminRoute } from './components/AdminRoute';
import { motion, AnimatePresence } from 'motion/react';
import { FirebaseProvider } from './lib/FirebaseProvider';
import { LanguageProvider } from './lib/LanguageProvider';

// Business / Industries Module Imports
import { BusinessProvider } from './components/business/BusinessContext';
import { SuperAdminRoute } from './components/business/SuperAdminRoute';
import { BusinessRoute } from './components/business/BusinessRoute';

// Super Admin Pages
import { SuperAdminDashboard } from './pages/super-admin/SuperAdminDashboard';
import { BusinessManagement } from './pages/super-admin/BusinessManagement';
import { CreateBusiness } from './pages/super-admin/CreateBusiness';
import { BusinessDetails } from './pages/super-admin/BusinessDetails';
import { PlatformUsers } from './pages/super-admin/PlatformUsers';
import { PlatformIssues } from './pages/super-admin/PlatformIssues';
import { PlatformAnalytics } from './pages/super-admin/PlatformAnalytics';
import { PlatformSettings } from './pages/super-admin/PlatformSettings';

// Business Tenant Pages
import { BusinessLogin } from './pages/business/BusinessLogin';
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessSettings } from './pages/business/BusinessSettings';
import { BusinessDepartments } from './pages/business/BusinessDepartments';
import { BusinessLocations } from './pages/business/BusinessLocations';
import { BusinessEmployees } from './pages/business/BusinessEmployees';
import { BusinessFormBuilder } from './pages/business/BusinessFormBuilder';
import { BusinessPortalSettings } from './pages/business/BusinessPortalSettings';
import { BusinessIssues } from './pages/business/BusinessIssues';
import { BusinessIssueDetail } from './pages/business/BusinessIssueDetail';
import { BusinessAnalytics } from './pages/business/BusinessAnalytics';

// Public Portal & Tracking Pages
import { PublicReportingPortal } from './pages/public/PublicReportingPortal';
import { ReportSuccess } from './pages/public/ReportSuccess';
import { PublicIssueTracker } from './pages/public/PublicIssueTracker';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Basic ErrorBoundary for Firestore errors
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, error: null };
  public props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      let errorInfo = null;
      try {
        errorInfo = JSON.parse(this.state.error.message);
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-surface-container-low p-8">
          <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl border-t-4 border-error">
            <h2 className="text-2xl font-bold text-error mb-4">Application Error</h2>
            <p className="text-on-surface-variant mb-6">
              {errorInfo ? `Firestore Error: ${errorInfo.error}` : (this.state.error?.message || "Something went wrong. Please try again later.")}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white py-3 rounded-full font-bold"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Inner App Layout component to hide default Navbar/Footer on Business/SuperAdmin/Portal/MainHome routes
const AppContent: React.FC = () => {
  const location = useLocation();
  const isStandalonePage = 
    location.pathname === '/' ||
    location.pathname === '/business-platform' ||
    location.pathname.startsWith('/business') || 
    location.pathname.startsWith('/super-admin') || 
    location.pathname.startsWith('/portal') ||
    location.pathname === '/new_home';

  return (
    <div className="min-h-screen flex flex-col">
      {!isStandalonePage && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* PLATFORM GATEWAY & REDESIGN ROUTES */}
            <Route path="/" element={<MainHome />} />
            <Route path="/business-platform" element={<BusinessLanding />} />
            <Route path="/civic" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Home />
              </motion.div>
            } />
            <Route path="/new_home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Login />
              </motion.div>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AdminDashboard />
                </motion.div>
              </AdminRoute>
            } />
            <Route path="/dashboard" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dashboard />
              </motion.div>
            } />
            <Route path="/track" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Track />
              </motion.div>
            } />
            <Route path="/report" element={
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ReportDetail />
              </motion.div>
            } />

            {/* NEW BUSINESS / INDUSTRIES MODULE ROUTES (ADDITIVE ONLY) */}
            
            {/* Business Auth */}
            <Route path="/business/login" element={<BusinessLogin />} />

            {/* Path Redirect Helpers */}
            <Route path="/super-admin" element={<Navigate to="/super-admin/dashboard" replace />} />
            <Route path="/super-admin/" element={<Navigate to="/super-admin/dashboard" replace />} />
            <Route path="/business" element={<Navigate to="/business/dashboard" replace />} />
            <Route path="/business/" element={<Navigate to="/business/dashboard" replace />} />

            {/* Super Admin Routes */}
            <Route path="/super-admin/dashboard" element={<SuperAdminRoute><SuperAdminDashboard /></SuperAdminRoute>} />
            <Route path="/super-admin/businesses" element={<SuperAdminRoute><BusinessManagement /></SuperAdminRoute>} />
            <Route path="/super-admin/businesses/new" element={<SuperAdminRoute><CreateBusiness /></SuperAdminRoute>} />
            <Route path="/super-admin/businesses/:id" element={<SuperAdminRoute><BusinessDetails /></SuperAdminRoute>} />
            <Route path="/super-admin/users" element={<SuperAdminRoute><PlatformUsers /></SuperAdminRoute>} />
            <Route path="/super-admin/issues" element={<SuperAdminRoute><PlatformIssues /></SuperAdminRoute>} />
            <Route path="/super-admin/analytics" element={<SuperAdminRoute><PlatformAnalytics /></SuperAdminRoute>} />
            <Route path="/super-admin/settings" element={<SuperAdminRoute><PlatformSettings /></SuperAdminRoute>} />

            {/* Business Tenant Routes */}
            <Route path="/business/dashboard" element={<BusinessRoute><BusinessDashboard /></BusinessRoute>} />
            <Route path="/business/settings" element={<BusinessRoute><BusinessSettings /></BusinessRoute>} />
            <Route path="/business/departments" element={<BusinessRoute><BusinessDepartments /></BusinessRoute>} />
            <Route path="/business/locations" element={<BusinessRoute><BusinessLocations /></BusinessRoute>} />
            <Route path="/business/employees" element={<BusinessRoute><BusinessEmployees /></BusinessRoute>} />
            <Route path="/business/forms/builder" element={<BusinessRoute><BusinessFormBuilder /></BusinessRoute>} />
            <Route path="/business/portal-settings" element={<BusinessRoute><BusinessPortalSettings /></BusinessRoute>} />
            <Route path="/business/issues" element={<BusinessRoute><BusinessIssues /></BusinessRoute>} />
            <Route path="/business/issues/:id" element={<BusinessRoute><BusinessIssueDetail /></BusinessRoute>} />
            <Route path="/business/analytics" element={<BusinessRoute><BusinessAnalytics /></BusinessRoute>} />

            {/* Public Reporting & Tracking Routes */}
            <Route path="/portal/track" element={<PublicIssueTracker />} />
            <Route path="/portal/success/:trackingNumber" element={<ReportSuccess />} />
            <Route path="/portal/:slug" element={<PublicReportingPortal />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <FirebaseProvider>
      <LanguageProvider>
        <BusinessProvider>
          <ErrorBoundary>
            <Router>
              <ScrollToTop />
              <AppContent />
            </Router>
          </ErrorBoundary>
        </BusinessProvider>
      </LanguageProvider>
    </FirebaseProvider>
  );
}
