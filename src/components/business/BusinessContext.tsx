// ============================================================
// Luminous Civic — Business Authentication & State Context
// Persisted Session Management for Super Admin & Business Tenants
// ============================================================

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { fetchCurrentBusinessProfile, loginBusinessUser, loginSuperAdminGoogle, logoutBusinessUser, SUPER_ADMIN_EMAIL } from '@/lib/business/businessAuth';
import { getBusiness, listBusinesses } from '@/lib/business/businessDb';
import type { Business, BusinessUser, SuperAdminUser } from '@/lib/business/types';

interface BusinessContextType {
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  role: 'super_admin' | 'business_user' | null;
  superAdmin: SuperAdminUser | null;
  businessUser: BusinessUser | null;
  business: Business | null;
  businesses: Business[];
  switchBusiness: (businessId: string) => Promise<void>;
  login: (email: string, pass: string) => Promise<{ role: 'super_admin' | 'business_user'; businessUser?: BusinessUser; superAdmin?: SuperAdminUser }>;
  loginGoogle: () => Promise<void>;
  loginDemoAdmin: () => void;
  loginDemoBusiness: () => void;
  logout: () => Promise<void>;
  refreshBusiness: () => Promise<void>;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);
const SESSION_KEY = 'luminous_active_session';
const ACTIVE_BIZ_KEY = 'luminous_selected_biz_id';

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<'super_admin' | 'business_user' | null>(null);
  const [superAdmin, setSuperAdmin] = useState<SuperAdminUser | null>(null);
  const [businessUser, setBusinessUser] = useState<BusinessUser | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [businesses, setBusinesses] = useState<Business[]>([]);

  // Load all available businesses for switching
  const loadAllBusinesses = async (): Promise<Business[]> => {
    try {
      const list = await listBusinesses();
      setBusinesses(list);
      return list;
    } catch (e) {
      return [];
    }
  };

  // Auto-populate active business matching saved preference or target business ID
  const ensureActiveBusiness = async (currentBiz: Business | null, targetBizId?: string): Promise<Business | null> => {
    const all = await loadAllBusinesses();
    if (all.length === 0) return currentBiz;

    const savedBizId = targetBizId || localStorage.getItem(ACTIVE_BIZ_KEY) || sessionStorage.getItem(ACTIVE_BIZ_KEY);
    if (savedBizId) {
      const match = all.find(b => b.id === savedBizId || b.slug === savedBizId);
      if (match) return match;
    }

    if (currentBiz && currentBiz.slug) {
      const match = all.find(b => b.id === currentBiz.id || b.slug === currentBiz.slug);
      if (match) return match;
    }

    return all[0];
  };

  const switchBusiness = async (businessId: string) => {
    const all = await loadAllBusinesses();
    const match = all.find(b => b.id === businessId || b.slug === businessId);
    if (match) {
      setBusiness(match);
      localStorage.setItem(ACTIVE_BIZ_KEY, match.id);
      sessionStorage.setItem(ACTIVE_BIZ_KEY, match.id);
      saveSession(role || 'business_user', superAdmin, businessUser, match);
    }
  };

  const restoreSession = async () => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const sess = JSON.parse(raw);
        if (sess.role) {
          setRole(sess.role);
          setSuperAdmin(sess.superAdmin || null);
          setBusinessUser(sess.businessUser || null);
          
          const targetId = sess.businessUser?.businessId || sess.business?.id;
          const biz = await ensureActiveBusiness(sess.business || null, targetId);
          setBusiness(biz);
          return true;
        }
      }
    } catch (e) {
      console.warn("Failed restoring session:", e);
    }
    const fallbackBiz = await ensureActiveBusiness(null);
    setBusiness(fallbackBiz);
    return false;
  };

  const saveSession = async (
    r: 'super_admin' | 'business_user',
    sa: SuperAdminUser | null,
    bu: BusinessUser | null,
    biz: Business | null
  ) => {
    const activeBiz = await ensureActiveBusiness(biz, bu?.businessId);
    if (activeBiz?.id) {
      localStorage.setItem(ACTIVE_BIZ_KEY, activeBiz.id);
      sessionStorage.setItem(ACTIVE_BIZ_KEY, activeBiz.id);
    }
    setRole(r);
    setSuperAdmin(sa);
    setBusinessUser(bu);
    setBusiness(activeBiz);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ role: r, superAdmin: sa, businessUser: bu, business: activeBiz }));
    } catch (e) {
      console.warn("Failed saving session:", e);
    }
  };

  const clearSession = () => {
    setRole(null);
    setSuperAdmin(null);
    setBusinessUser(null);
    setBusiness(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  };

  const loadUserData = async (u: FirebaseUser | null) => {
    setLoading(true);
    if (!u || !u.email) {
      const restored = await restoreSession();
      if (!restored) {
        clearSession();
      }
      setLoading(false);
      return;
    }

    setFirebaseUser(u);
    try {
      const res = await fetchCurrentBusinessProfile(u.uid, u.email);
      if (res.role === 'super_admin') {
        await saveSession('super_admin', res.superAdmin || null, null, null);
      } else if (res.role === 'business_user' && res.businessUser) {
        const bizData = await getBusiness(res.businessUser.businessId);
        await saveSession('business_user', null, res.businessUser, bizData);
      } else {
        await restoreSession();
      }
    } catch (e) {
      console.error("Error loading business context:", e);
      await restoreSession();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      loadUserData(u);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await loginBusinessUser(email, pass);
      if (res.role === 'super_admin' && res.superAdmin) {
        await saveSession('super_admin', res.superAdmin, null, null);
      } else if (res.role === 'business_user' && res.businessUser) {
        const bizData = await getBusiness(res.businessUser.businessId);
        await saveSession('business_user', null, res.businessUser, bizData);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = async () => {
    setLoading(true);
    try {
      const sa = await loginSuperAdminGoogle();
      await saveSession('super_admin', sa, null, null);
    } finally {
      setLoading(false);
    }
  };

  const loginDemoAdmin = async () => {
    const sa: SuperAdminUser = {
      uid: 'demo_super_admin',
      email: SUPER_ADMIN_EMAIL,
      name: 'Platform Super Admin (Demo Session)',
      role: 'super_admin',
      createdAt: new Date().toISOString()
    };
    await saveSession('super_admin', sa, null, null);
    setLoading(false);
  };

  const loginDemoBusiness = async () => {
    const bu: BusinessUser = {
      uid: 'demo_biz_user',
      businessId: 'default_biz',
      email: 'business@luminouscivic.com',
      name: 'Business Operations Manager',
      role: 'admin',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    const all = await listBusinesses();
    const activeBiz = all.length > 0 ? all[0] : null;
    await saveSession('business_user', null, bu, activeBiz);
    setLoading(false);
  };

  const logout = async () => {
    clearSession();
    try {
      await logoutBusinessUser();
    } catch (e) {}
    setFirebaseUser(null);
  };

  const refreshBusiness = async () => {
    if (businessUser?.businessId) {
      const bizData = await getBusiness(businessUser.businessId);
      await saveSession('business_user', null, businessUser, bizData);
    } else {
      const all = await listBusinesses();
      if (all.length > 0) {
        await saveSession(role || 'business_user', superAdmin, businessUser, all[0]);
      }
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        firebaseUser,
        loading,
        role,
        superAdmin,
        businessUser,
        business,
        businesses,
        switchBusiness,
        login,
        loginGoogle,
        loginDemoAdmin,
        loginDemoBusiness,
        logout,
        refreshBusiness
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export function useBusinessContext() {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return ctx;
}
