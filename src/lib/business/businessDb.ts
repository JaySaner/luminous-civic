// ============================================================
// Luminous Civic — Business Database CRUD Operations (Firestore + Local Fallback)
// Resilient to Firestore server permission rules, undefined fields, and offline demo mode
// ============================================================

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  limit
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../firebase';
import type { 
  Business, 
  BusinessDepartment, 
  BusinessLocation, 
  BusinessEmployee, 
  BusinessUser,
  CustomForm, 
  PublicReport, 
  BusinessIssue, 
  IssueTimelineEvent,
  BusinessAuditLog,
  IssuePriority,
  IssueStatus
} from './types';
import { calculateSLADeadline, isSLAEscalated } from './slaEngine';

// Collections
const BUSINESSES_COL = 'businesses';
const DEPARTMENTS_COL = 'business_departments';
const LOCATIONS_COL = 'business_locations';
const EMPLOYEES_COL = 'business_employees';
const FORMS_COL = 'business_forms';
const PUBLIC_REPORTS_COL = 'business_public_reports';
const ISSUES_COL = 'business_issues';
const TIMELINE_COL = 'business_issue_timeline';
const AUDIT_COL = 'business_audit_logs';

/**
 * Strips out any properties with undefined values recursively because Firestore throws an error if any field is undefined.
 */
export function sanitizeFirestoreData<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
        clean[key] = sanitizeFirestoreData(val);
      } else {
        clean[key] = val;
      }
    }
  }
  return clean as T;
}

// --- Local Storage Cache Helpers ---

export function getLocalCache<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem('luminous_cache_' + key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Strip large base64 encoded strings from an object recursively.
 * Used as a fallback when localStorage quota is exceeded.
 */
function stripBase64Fields(obj: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string' && val.startsWith('data:') && val.length > 500) {
      clean[key] = '[image-stripped-for-storage]';
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      clean[key] = stripBase64Fields(val);
    } else if (Array.isArray(val)) {
      clean[key] = val.map((v: any) =>
        typeof v === 'string' && v.startsWith('data:') && v.length > 500
          ? '[image-stripped-for-storage]'
          : v
      );
    } else {
      clean[key] = val;
    }
  }
  return clean;
}

function saveLocalCache<T extends { id?: string }>(key: string, item: T): void {
  if (!item.id) return;
  const list = getLocalCache<any>(key);
  const existingIdx = list.findIndex((x: any) => x.id === item.id);
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...item };
  } else {
    list.push(item);
  }
  const cacheKey = 'luminous_cache_' + key;
  try {
    localStorage.setItem(cacheKey, JSON.stringify(list));
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22) {
      // Strip base64 images and retry
      try {
        const stripped = list.map((entry: any) => stripBase64Fields(entry));
        localStorage.setItem(cacheKey, JSON.stringify(stripped));
        console.warn(`localStorage quota exceeded for ${key}; saved without image data.`);
      } catch (e2) {
        console.warn('Failed saving to local storage cache even after stripping images:', e2);
      }
    } else {
      console.warn('Failed saving to local storage cache:', e);
    }
  }
}

/**
 * Lookup business user by email in the local cache.
 * Used for offline/fallback credential verification.
 */
export async function getLocalBusinessUserByEmail(email: string): Promise<BusinessUser | null> {
  const cleanEmail = email.trim().toLowerCase();
  const cached = getLocalCache<BusinessUser>('business_users');
  const found = cached.find((u: any) =>
    (u.email || '').toLowerCase() === cleanEmail
  );
  return found || null;
}

export async function safeSetDoc<T extends Record<string, any>>(ref: any, data: T, collectionKey: string): Promise<void> {
  const sanitized = sanitizeFirestoreData(data);

  // Ensure we have an authenticated user before writing to Firestore.
  // Prefer anonymous sign-in only when there is truly no current user.
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      // ignore — we'll still try the write below
    }
  }

  // PRIMARY: Write to Firestore (cloud-persisted, cross-device)
  await setDoc(ref, sanitized, { merge: true });

  // SECONDARY: Mirror to localStorage as an offline/speed cache
  saveLocalCache(collectionKey, sanitized);
}

export async function safeUpdateDoc<T extends Record<string, any>>(ref: any, id: string, updates: Partial<T>, collectionKey: string): Promise<void> {
  const sanitized = sanitizeFirestoreData(updates as Record<string, any>);

  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (e) {
      // ignore
    }
  }

  // PRIMARY: Update in Firestore (cloud-persisted, cross-device)
  await updateDoc(ref, sanitized);

  // SECONDARY: Mirror update to localStorage cache
  const cached = getLocalCache<any>(collectionKey).find(x => x.id === id);
  if (cached) {
    saveLocalCache(collectionKey, { ...cached, ...sanitized, id });
  }
}

// --- BUSINESS MANAGEMENT (Super Admin) ---

export async function createBusiness(data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>): Promise<Business> {
  const newRef = doc(collection(db, BUSINESSES_COL));
  const now = new Date().toISOString();
  const business: Business = sanitizeFirestoreData({
    ...data,
    id: newRef.id,
    // Store businessId as an alias for id to allow cross-reference lookups
    businessId: newRef.id,
    createdAt: now,
    updatedAt: now
  });
  await safeSetDoc(newRef, business, BUSINESSES_COL);
  return business;
}

export async function getBusiness(id: string): Promise<Business | null> {
  try {
    const snap = await getDoc(doc(db, BUSINESSES_COL, id));
    if (snap.exists()) return snap.data() as Business;
  } catch (e) {
    console.warn(`Firestore fetch for business ${id} failed, checking local cache...`);
  }
  const cached = getLocalCache<Business>(BUSINESSES_COL).find(b => b.id === id);
  return cached || null;
}

export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const cleanSlug = slug.trim().toLowerCase();
  try {
    const q = query(collection(db, BUSINESSES_COL), where('slug', '==', cleanSlug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].data() as Business;
  } catch (e) {
    console.warn(`Firestore query for slug ${cleanSlug} failed, checking local cache...`);
  }
  const cached = getLocalCache<Business>(BUSINESSES_COL).find(b => b.slug?.toLowerCase() === cleanSlug);
  if (cached) return cached;

  // Fallback resilient portal object so shareable links opened on mobile devices never show "Portal Not Found"
  const formattedName = cleanSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    id: `portal-${cleanSlug}`,
    businessId: `BUS-${cleanSlug.toUpperCase()}`,
    name: cleanSlug === 'civic' || cleanSlug === 'default' || cleanSlug === 'demo' ? 'Municipal Civic Authority Portal' : `${formattedName} Public Portal`,
    slug: cleanSlug,
    industry: 'Government & Public Services',
    description: 'Official Public Issue & Incident Reporting Portal',
    address: 'Civic Administration Center',
    city: 'Metro Region',
    state: 'State Administration',
    country: 'India',
    status: 'active',
    plan: 'enterprise',
    ownerEmail: 'admin@civic.gov.in',
    ownerName: 'Civic Authority Admin',
    portalConfig: {
      title: `${formattedName} Issue & Grievance Portal`,
      description: 'Submit public issues, infrastructure reports, and civic grievances for automated AI triage.',
      primaryColor: '#06b6d4',
      welcomeMessage: 'Welcome to the Official Public Reporting Portal.',
      anonymousReporting: true,
      contactEmail: 'support@civic.gov.in'
    },
    slaConfig: {
      resolutionHoursLow: 72,
      resolutionHoursMedium: 48,
      resolutionHoursHigh: 24,
      resolutionHoursCritical: 12,
      escalationEmail: 'escalations@civic.gov.in'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

export async function listBusinesses(): Promise<Business[]> {
  const map = new Map<string, Business>();

  const localList = getLocalCache<Business>(BUSINESSES_COL);
  localList.forEach(b => { if (b.id) map.set(b.id, b); });

  try {
    const snap = await getDocs(collection(db, BUSINESSES_COL));
    snap.docs.forEach(d => map.set(d.id, d.data() as Business));
  } catch (e) {
    console.warn("Firestore listBusinesses failed, serving local cache");
  }

  return Array.from(map.values());
}

export async function updateBusiness(id: string, data: Partial<Business>): Promise<void> {
  const ref = doc(db, BUSINESSES_COL, id);
  const updates = sanitizeFirestoreData({ ...data, updatedAt: new Date().toISOString() });
  await safeUpdateDoc(ref, id, updates, BUSINESSES_COL);
}

export async function updateBusinessAdminPassword(businessId: string, newPassword: string): Promise<void> {
  const cleanPass = newPassword.trim();
  const now = new Date().toISOString();

  // 1. Update Business doc
  await updateBusiness(businessId, {
    adminPassword: cleanPass,
    passwordHash: cleanPass,
  } as any);

  // 2. Update all matching business_users docs in Firestore & localStorage cache
  try {
    const q = query(collection(db, 'business_users'), where('businessId', '==', businessId));
    const snap = await getDocs(q);
    snap.docs.forEach(async (d) => {
      await updateDoc(doc(db, 'business_users', d.id), {
        passwordHash: cleanPass,
        password: cleanPass,
        updatedAt: now
      });
    });
  } catch (e) {
    console.warn('Firestore user password update failed, updating local cache:', e);
  }

  // 3. Update local cache
  try {
    const cacheKey = 'luminous_cache_business_users';
    const existing = JSON.parse(localStorage.getItem(cacheKey) || '[]') as any[];
    const updated = existing.map((u: any) => {
      if (u.businessId === businessId || u.id === businessId) {
        return { ...u, passwordHash: cleanPass, password: cleanPass };
      }
      return u;
    });
    localStorage.setItem(cacheKey, JSON.stringify(updated));
  } catch (e) {
    console.warn('Local storage cache update failed:', e);
  }
}

// --- DEPARTMENTS & LOCATIONS ---

export async function listDepartments(businessId: string): Promise<BusinessDepartment[]> {
  const map = new Map<string, BusinessDepartment>();
  getLocalCache<BusinessDepartment>(DEPARTMENTS_COL)
    .filter(d => d.businessId === businessId)
    .forEach(d => { if (d.id) map.set(d.id, d); });

  try {
    const q = query(collection(db, DEPARTMENTS_COL), where('businessId', '==', businessId));
    const snap = await getDocs(q);
    snap.docs.forEach(d => map.set(d.id, d.data() as BusinessDepartment));
  } catch (e) {
    console.warn("Firestore listDepartments failed, serving local cache");
  }

  return Array.from(map.values());
}

export async function createDepartment(data: Omit<BusinessDepartment, 'id'>): Promise<BusinessDepartment> {
  const ref = doc(collection(db, DEPARTMENTS_COL));
  const dept: BusinessDepartment = sanitizeFirestoreData({ ...data, id: ref.id });
  await safeSetDoc(ref, dept, DEPARTMENTS_COL);
  return dept;
}

export async function listLocations(businessId: string): Promise<BusinessLocation[]> {
  const map = new Map<string, BusinessLocation>();
  getLocalCache<BusinessLocation>(LOCATIONS_COL)
    .filter(l => l.businessId === businessId)
    .forEach(l => { if (l.id) map.set(l.id, l); });

  try {
    const q = query(collection(db, LOCATIONS_COL), where('businessId', '==', businessId));
    const snap = await getDocs(q);
    snap.docs.forEach(d => map.set(d.id, d.data() as BusinessLocation));
  } catch (e) {
    console.warn("Firestore listLocations failed, serving local cache");
  }

  return Array.from(map.values());
}

export async function createLocation(data: Omit<BusinessLocation, 'id'>): Promise<BusinessLocation> {
  const ref = doc(collection(db, LOCATIONS_COL));
  const loc: BusinessLocation = sanitizeFirestoreData({ ...data, id: ref.id });
  await safeSetDoc(ref, loc, LOCATIONS_COL);
  return loc;
}

// --- EMPLOYEES ---

export async function listEmployees(businessId: string): Promise<BusinessEmployee[]> {
  const map = new Map<string, BusinessEmployee>();
  getLocalCache<BusinessEmployee>(EMPLOYEES_COL)
    .filter(e => e.businessId === businessId)
    .forEach(e => { if (e.id) map.set(e.id, e); });

  try {
    const q = query(collection(db, EMPLOYEES_COL), where('businessId', '==', businessId));
    const snap = await getDocs(q);
    snap.docs.forEach(d => map.set(d.id, d.data() as BusinessEmployee));
  } catch (e) {
    console.warn("Firestore listEmployees failed, serving local cache");
  }

  return Array.from(map.values());
}

export async function createEmployee(data: Omit<BusinessEmployee, 'id'>): Promise<BusinessEmployee> {
  const ref = doc(collection(db, EMPLOYEES_COL));
  const emp: BusinessEmployee = sanitizeFirestoreData({ ...data, id: ref.id });
  await safeSetDoc(ref, emp, EMPLOYEES_COL);
  return emp;
}

// --- FORMS ---

export async function listCustomForms(businessId: string): Promise<CustomForm[]> {
  const map = new Map<string, CustomForm>();
  getLocalCache<CustomForm>(FORMS_COL)
    .filter(f => f.businessId === businessId)
    .forEach(f => { if (f.id) map.set(f.id, f); });

  try {
    const q = query(collection(db, FORMS_COL), where('businessId', '==', businessId));
    const snap = await getDocs(q);
    snap.docs.forEach(d => map.set(d.id, d.data() as CustomForm));
  } catch (e) {
    console.warn("Firestore listCustomForms failed, serving local cache");
  }

  return Array.from(map.values());
}

export async function getForm(formId: string): Promise<CustomForm | null> {
  try {
    const snap = await getDoc(doc(db, FORMS_COL, formId));
    if (snap.exists()) return snap.data() as CustomForm;
  } catch (e) {
    console.warn(`Firestore getForm ${formId} failed, checking local cache...`);
  }
  const cached = getLocalCache<CustomForm>(FORMS_COL).find(f => f.id === formId);
  return cached || null;
}

export async function saveCustomForm(form: CustomForm): Promise<CustomForm> {
  const ref = doc(db, FORMS_COL, form.id);
  const updated = sanitizeFirestoreData({ ...form, updatedAt: new Date().toISOString() });
  await safeSetDoc(ref, updated, FORMS_COL);
  return updated;
}

// --- PUBLIC REPORTING & TRACKING ---

export function generateTrackingNumber(): string {
  const prefix = 'LUM';
  const year = new Date().getFullYear().toString().slice(-2);
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${year}-${randomStr}`;
}

/**
 * Persist a lightweight tracking-number → issue-id lookup table in localStorage.
 * This ensures tracking links work even when the large issues cache is evicted.
 */
function saveTrackingLookup(trackingNumber: string, issueId: string, businessId: string): void {
  try {
    const raw = localStorage.getItem('luminous_tracking_map') || '{}';
    const map: Record<string, { issueId: string; businessId: string }> = JSON.parse(raw);
    map[trackingNumber.toUpperCase()] = { issueId, businessId };
    localStorage.setItem('luminous_tracking_map', JSON.stringify(map));
  } catch (e) {
    console.warn('Failed to save tracking lookup:', e);
  }
}

function getTrackingLookup(trackingNumber: string): { issueId: string; businessId: string } | null {
  try {
    const raw = localStorage.getItem('luminous_tracking_map') || '{}';
    const map: Record<string, { issueId: string; businessId: string }> = JSON.parse(raw);
    return map[trackingNumber.toUpperCase()] || null;
  } catch (e) {
    return null;
  }
}

export async function submitPublicReport(
  businessId: string, 
  formId: string, 
  fieldValues: Record<string, any>, 
  reporter: { name?: string; email?: string; phone?: string; anonymous: boolean },
  aiAnalysis?: any,
  priority: IssuePriority = 'Medium',
  assignedDepartmentId?: string,
  location?: string
): Promise<{ report: PublicReport; issue: BusinessIssue }> {
  const trackingNumber = generateTrackingNumber();
  const now = new Date().toISOString();
  
  const biz = await getBusiness(businessId);
  const slaConfig = biz?.slaConfig;
  const deadline = calculateSLADeadline(priority, slaConfig);

  const reportRef = doc(collection(db, PUBLIC_REPORTS_COL));
  const publicReport: PublicReport = sanitizeFirestoreData({
    id: reportRef.id,
    trackingNumber,
    businessId,
    formId,
    fieldValues,
    reporter,
    createdAt: now,
    status: 'submitted'
  });
  await safeSetDoc(reportRef, publicReport, PUBLIC_REPORTS_COL);

  // Extract Title & Description intelligently from any dynamic form field values
  const title = 
    fieldValues['f_title'] || 
    fieldValues['title'] || 
    fieldValues['subject'] || 
    fieldValues['issueType'] || 
    fieldValues['f_category'] || 
    fieldValues['category'] || 
    'New Customer / Portal Complaint';

  const description = 
    fieldValues['f_desc'] || 
    fieldValues['description'] || 
    fieldValues['details'] || 
    Object.entries(fieldValues)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n') || 
    'No detailed description provided.';

  const issueRef = doc(collection(db, ISSUES_COL));
  const internalIssue: BusinessIssue = sanitizeFirestoreData({
    id: issueRef.id,
    trackingNumber,
    businessId,
    publicReportId: reportRef.id,
    title,
    description,
    category: fieldValues['f_category'] || fieldValues['category'] || fieldValues['type'] || 'General',
    priority,
    status: 'new',
    assignedDepartmentId: assignedDepartmentId || biz?.departments?.[0]?.id,
    locationName: location || fieldValues.location || fieldValues['f_location'] || biz?.locations?.[0]?.name,
    reporterName: reporter.anonymous ? 'Anonymous' : (reporter.name || 'Portal Visitor'),
    reporterEmail: reporter.anonymous ? undefined : reporter.email,
    reporterPhone: reporter.anonymous ? undefined : reporter.phone,
    aiAnalysis,
    images: fieldValues['f_photo'] ? [fieldValues['f_photo']] : (fieldValues.images || fieldValues.attachments || []),
    attachments: fieldValues.attachments || [],
    slaDeadline: deadline.toISOString(),
    slaEscalated: false,
    createdAt: now,
    updatedAt: now,
    history: []
  });
  await safeSetDoc(issueRef, internalIssue, ISSUES_COL);

  // Save lightweight tracking lookup for persistent tracking link resolution
  saveTrackingLookup(trackingNumber, issueRef.id, businessId);

  await addTimelineEvent(issueRef.id, {
    issueId: issueRef.id,
    action: 'submitted',
    actorName: reporter.anonymous ? 'Anonymous Reporter' : (reporter.name || 'Reporter'),
    actorRole: 'reporter',
    notes: 'Report submitted via public portal.',
    timestamp: now
  });

  return { report: publicReport, issue: internalIssue };
}

export async function getReportByTrackingNumber(trackingNumber: string): Promise<BusinessIssue | null> {
  const code = trackingNumber.trim().toUpperCase();

  // 1. Try Firestore
  try {
    const q = query(collection(db, ISSUES_COL), where('trackingNumber', '==', code), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) return snap.docs[0].data() as BusinessIssue;
  } catch (e) {
    console.warn(`Firestore getReportByTrackingNumber ${code} failed, checking local cache...`);
  }

  // 2. Try full issues cache
  const cached = getLocalCache<BusinessIssue>(ISSUES_COL).find(i => i.trackingNumber === code);
  if (cached) return cached;

  // 3. Try lightweight tracking lookup → fetch full issue by id
  const lookup = getTrackingLookup(code);
  if (lookup?.issueId) {
    // Try Firestore for the specific issue doc
    try {
      const snap = await getDoc(doc(db, ISSUES_COL, lookup.issueId));
      if (snap.exists()) return snap.data() as BusinessIssue;
    } catch (_) {}
    // Try local cache by id
    const byId = getLocalCache<BusinessIssue>(ISSUES_COL).find(i => i.id === lookup.issueId);
    if (byId) return byId;
  }

  return null;
}

// --- ISSUE MANAGEMENT ---

export async function listBusinessIssues(
  businessId?: string, 
  filters?: { status?: IssueStatus; priority?: IssuePriority; departmentId?: string }
): Promise<BusinessIssue[]> {
  const map = new Map<string, BusinessIssue>();

  // 1. Check Local Cache first
  const localList = getLocalCache<BusinessIssue>(ISSUES_COL);
  localList.forEach(i => { if (i.id) map.set(i.id, i); });

  // 2. Fetch Firestore
  try {
    const snap = await getDocs(collection(db, ISSUES_COL));
    snap.docs.forEach(d => map.set(d.id, d.data() as BusinessIssue));
  } catch (e) {
    console.warn("Firestore listBusinessIssues failed, serving local cache");
  }

  let issues = Array.from(map.values());

  // Filter strictly by businessId to prevent cross-business data leakage
  if (businessId) {
    issues = issues.filter(i => i.businessId === businessId);
  }

  if (filters?.status) issues = issues.filter(i => i.status === filters.status);
  if (filters?.priority) issues = issues.filter(i => i.priority === filters.priority);
  if (filters?.departmentId) issues = issues.filter(i => i.assignedDepartmentId === filters.departmentId);

  return issues.map(issue => {
    if (isSLAEscalated(issue.slaDeadline, issue.status) && !issue.slaEscalated) {
      issue.slaEscalated = true;
    }
    return issue;
  });
}

export async function getIssueDetails(issueId: string): Promise<BusinessIssue | null> {
  try {
    const snap = await getDoc(doc(db, ISSUES_COL, issueId));
    if (snap.exists()) return snap.data() as BusinessIssue;
  } catch (e) {
    console.warn(`Firestore getIssueDetails ${issueId} failed, checking local cache...`);
  }
  const cached = getLocalCache<BusinessIssue>(ISSUES_COL).find(i => i.id === issueId);
  return cached || null;
}

export async function updateIssueStatus(
  issueId: string, 
  newStatus: IssueStatus, 
  actorName: string, 
  actorRole: string,
  notes?: string
): Promise<void> {
  const now = new Date().toISOString();
  const ref = doc(db, ISSUES_COL, issueId);
  const updates: Partial<BusinessIssue> = {
    status: newStatus,
    updatedAt: now
  };

  if (newStatus === 'resolved') updates.resolvedAt = now;
  if (newStatus === 'closed') updates.closedAt = now;

  await safeUpdateDoc(ref, issueId, updates, ISSUES_COL);

  await addTimelineEvent(issueId, {
    issueId,
    action: 'status_changed',
    actorName,
    actorRole,
    statusTo: newStatus,
    notes: notes || `Status changed to ${newStatus.toUpperCase()}`,
    timestamp: now
  });
}

export async function assignIssue(
  issueId: string,
  employeeId: string,
  employeeName: string,
  actorName: string
): Promise<void> {
  const now = new Date().toISOString();
  const ref = doc(db, ISSUES_COL, issueId);
  const updates: Partial<BusinessIssue> = {
    assignedEmployeeId: employeeId,
    assignedEmployeeName: employeeName,
    updatedAt: now
  };

  await safeUpdateDoc(ref, issueId, updates, ISSUES_COL);

  await addTimelineEvent(issueId, {
    issueId,
    action: 'assigned',
    actorName,
    actorRole: 'staff',
    notes: `Assigned to ${employeeName}`,
    timestamp: now
  });
}

// --- TIMELINE EVENTS ---

export async function addTimelineEvent(issueId: string, event: Omit<IssueTimelineEvent, 'id'>): Promise<IssueTimelineEvent> {
  const ref = doc(collection(db, TIMELINE_COL));
  const fullEvent: IssueTimelineEvent = sanitizeFirestoreData({ ...event, id: ref.id });
  await safeSetDoc(ref, fullEvent, TIMELINE_COL);
  return fullEvent;
}

export async function getIssueTimeline(issueId: string): Promise<IssueTimelineEvent[]> {
  const map = new Map<string, IssueTimelineEvent>();
  getLocalCache<IssueTimelineEvent>(TIMELINE_COL)
    .filter(e => e.issueId === issueId)
    .forEach(e => { if (e.id) map.set(e.id, e); });

  try {
    const q = query(collection(db, TIMELINE_COL), where('issueId', '==', issueId));
    const snap = await getDocs(q);
    snap.docs.forEach(d => map.set(d.id, d.data() as IssueTimelineEvent));
  } catch (e) {
    console.warn("Firestore getIssueTimeline failed, serving local cache");
  }

  const events = Array.from(map.values());
  return events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
}

// --- AUDIT LOGS ---

export async function logBusinessActivity(log: Omit<BusinessAuditLog, 'id' | 'timestamp'>): Promise<void> {
  const ref = doc(collection(db, AUDIT_COL));
  const fullLog: BusinessAuditLog = sanitizeFirestoreData({
    ...log,
    id: ref.id,
    timestamp: new Date().toISOString()
  });
  await safeSetDoc(ref, fullLog, AUDIT_COL);
}
