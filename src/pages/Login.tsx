import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useFirebase } from '../lib/FirebaseProvider';
import { loginWithGoogle } from '../lib/firebase';
import { motion } from 'motion/react';
import { LogIn, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const { user, loading } = useFirebase();
  const navigate = useNavigate();

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl border border-outline-variant text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8">
          <ShieldCheck size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface mb-4">
          Secure Access
        </h1>
        <p className="text-on-surface-variant mb-10">
          Please sign in with your authorized account to access restricted areas.
        </p>

        <button
          onClick={handleLogin}
          className="w-full civic-pulse-gradient text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-primary/25 transition-all flex items-center justify-center gap-3"
        >
          <LogIn size={24} />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
};
