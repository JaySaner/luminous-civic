import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Track } from './pages/Track';
import { ReportDetail } from './pages/ReportDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { AdminRoute } from './components/AdminRoute';
import { motion, AnimatePresence } from 'motion/react';
import { FirebaseProvider } from './lib/FirebaseProvider';
import { LanguageProvider } from './lib/LanguageProvider';

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

export default function App() {
  return (
    <FirebaseProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Home />
                      </motion.div>
                    } />
                    <Route path="/login" element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Login />
                      </motion.div>
                    } />
                    <Route path="/admin" element={
                      <AdminRoute>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <AdminDashboard />
                        </motion.div>
                      </AdminRoute>
                    } />
                    <Route path="/dashboard" element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Dashboard />
                      </motion.div>
                    } />
                    <Route path="/track" element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Track />
                      </motion.div>
                    } />
                    <Route path="/report" element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ReportDetail />
                      </motion.div>
                    } />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </Router>
        </ErrorBoundary>
      </LanguageProvider>
    </FirebaseProvider>
  );
}
