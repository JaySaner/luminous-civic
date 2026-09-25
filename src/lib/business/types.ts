// ============================================================
// Luminous Civic — Business / Industries Module Types
// ============================================================

// --- Business Entity ---

export type BusinessStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type BusinessPlan = 'basic' | 'business' | 'pro' | 'enterprise' | 'Starter' | 'Pro' | 'Enterprise';

export interface Business {
  id: string;                   // Firestore doc ID
  businessId?: string;          // Alias of id for cross-ref lookups
  name: string;
  slug: string;                 // URL-safe slug for public portal
  // Industry field (prefer industryType for new records)
  industry?: string;
  industryType?: string;        // Used by CreateBusiness & BusinessManagement
  description?: string;
  registrationNumber?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
  logoBase64?: string;
  logoUrl?: string;             // Base64 or URL logo
  branding?: Record<string, any>; // Custom branding settings
  status: BusinessStatus;
  // Plan field (prefer subscriptionPlan for new records)
  plan?: BusinessPlan;
  subscriptionPlan?: 'Starter' | 'Pro' | 'Enterprise'; // Used by CreateBusiness
  ownerId?: string;
  ownerEmail?: string;
  ownerName?: string;
  ownerPhone?: string;
  portalConfig?: PortalConfig;
  slaConfig?: SLAConfig;
  departments?: { id: string; name: string; code?: string }[];
  locations?: { id: string; name: string; address?: string }[];
  operatingHours?: string;
  timezone?: string;
  expectedUsers?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PortalConfig {
  title?: string;
  description?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  reportingInstructions?: string;
  anonymousReporting?: boolean;
  contactEmail?: string;
  contactPhone?: string;
}

// --- Business Users ---

export type BusinessUserRole =
  | 'admin'
  | 'manager'
  | 'staff'
  | 'business_owner'
  | 'business_manager'
  | 'business_employee';

export type BusinessUserStatus = 'active' | 'inactive' | 'pending_setup';

export interface BusinessUser {
  id?: string;
  uid: string;                  // Firebase Auth UID
  businessId: string;
  email: string;
  name: string;
  phone?: string;
  role: BusinessUserRole;
  departmentId?: string;
  departmentName?: string;
  status: BusinessUserStatus;
  passwordHash?: string;        // Stored for offline/fallback auth
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

// --- Super Admin & Inquiries ---

export interface SuperAdminUser {
  uid: string;
  email: string;
  name: string;
  role: 'super_admin';
  createdAt: string;
  lastLoginAt?: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'converted';

export interface BusinessInquiry {
  id: string;
  fullName: string;
  workEmail: string;
  companyName: string;
  phone: string;
  industry: string;
  locationsCount?: string;
  notes?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt?: string;
}

// --- Business Locations ---

export interface BusinessLocation {
  id: string;
  businessId: string;
  name: string;
  address?: string;
  city?: string;
  isPrimary?: boolean;
  qrCodeData?: string;
  createdAt?: string;
}

// --- Departments ---

export interface BusinessDepartment {
  id: string;
  businessId: string;
  name: string;
  code?: string;
  description?: string;
  color?: string;
  icon?: string;
  email?: string;
  headUserId?: string;
  headUserName?: string;
  userCount?: number;
  createdAt?: string;
}

// Keep old alias
export type Department = BusinessDepartment;

// --- Business Employees ---

export interface BusinessEmployee {
  id: string;
  uid?: string;
  businessId: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  departmentId?: string;
  departmentName?: string;
  designation?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
}

// --- Custom Forms ---

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'location'
  | 'image_upload'
  | 'file'
  | 'video_upload'
  | 'document_upload'
  | 'phone'
  | 'email'
  | 'rating'
  | 'section'
  | 'instructions';

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  helpText?: string;
  order?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
}

// Alias
export type CustomFormField = FormField;

export interface CustomForm {
  id: string;
  businessId: string;
  title?: string;
  description?: string;
  fields: FormField[];
  version?: number;
  published?: boolean;
  isPublished?: boolean;      // alias for published
  updatedAt?: string;
  createdAt?: string;
}

// --- Business Issues ---

export type IssuePriority = 'Critical' | 'High' | 'Medium' | 'Low' | 'critical' | 'high' | 'medium' | 'low';
export type IssueStatus =
  | 'new'
  | 'submitted'
  | 'ai_processing'
  | 'triaged'
  | 'assigned'
  | 'in_progress'
  | 'waiting'
  | 'resolved'
  | 'closed'
  | 'rejected'
  | 'reopened'
  | 'escalated';

export interface IssueAttachment {
  id?: string;
  type?: 'image' | 'video' | 'document';
  name?: string;
  data?: string;
  mimeType?: string;
  size?: number;
}

export interface IssueTimelineEvent {
  id: string;
  issueId: string;
  action: string;
  actorName: string;
  actorRole: string;
  statusTo?: string;
  statusFrom?: string;
  notes?: string;
  timestamp: string;
}

export interface BusinessIssue {
  id: string;
  businessId: string;
  // tracking fields (aliases)
  trackingId?: string;          // Old format: LC-10482
  trackingNumber?: string;      // New format: LUM-26-XXXXX
  publicReportId?: string;
  title: string;
  description: string;
  category?: string;
  subcategory?: string;
  priority: IssuePriority;
  status: IssueStatus;
  locationId?: string;
  locationName?: string;
  // department (prefer assignedDepartmentId for new records)
  departmentId?: string;
  departmentName?: string;
  assignedDepartmentId?: string;
  // assignment
  assignedTo?: string;
  assignedToName?: string;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  images?: string[];
  attachments?: (IssueAttachment | string)[];
  formData?: Record<string, any>;
  fieldValues?: Record<string, any>;
  formVersion?: number;
  slaDeadline?: string;
  slaStatus?: 'on_track' | 'warning' | 'breached';
  slaEscalated?: boolean;
  aiAnalysis?: any;
  aiAnalysisId?: string;
  aiStatus?: 'pending' | 'completed' | 'failed' | 'skipped';
  history?: any[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
}

// --- Public Reports ---

export interface PublicReport {
  id: string;
  trackingNumber: string;
  businessId: string;
  formId: string;
  fieldValues: Record<string, any>;
  reporter: {
    name?: string;
    email?: string;
    phone?: string;
    anonymous: boolean;
  };
  createdAt: string;
  status: string;
}

// AI Analysis Aliases
export type BusinessAIAnalysis = AIBusinessAnalysis;

export interface AIBusinessAnalysis {
  id?: string;
  issueId?: string;
  businessId?: string;
  issueType?: string;
  category?: string;
  subcategory?: string;
  priority: IssuePriority;
  confidence?: number;
  suggestedDepartment?: string;
  risk?: string;
  suggestedActions?: string[];
  potentialDuplicate?: boolean;
  duplicateIssueId?: string;
  similarityScore?: number;
  summary: string;
  suggestedAction?: string;
  estimatedHoursToResolve?: number;
  tags?: string[];
  status?: 'pending' | 'completed' | 'failed';
  analyzedAt?: string;
  createdAt?: string;
}

// --- Issue Comments ---

export type CommentType = 'comment' | 'status_change' | 'assignment' | 'escalation' | 'note';

export interface IssueComment {
  id: string;
  issueId: string;
  businessId: string;
  userId: string;
  userName: string;
  content: string;
  type: CommentType;
  isInternal: boolean;
  createdAt: string;
}

// --- Business Audit Logs ---

export interface BusinessAuditLog {
  id: string;
  businessId?: string;
  userId?: string;
  userName?: string;
  action: string;
  entity?: string;
  entityId?: string;
  details?: string;
  timestamp: string;
}

// Keep alias
export type AuditLog = BusinessAuditLog;

// --- SLA Config ---

export interface SLAConfig {
  // New compact fields
  critical?: number;
  high?: number;
  medium?: number;
  low?: number;
  // Legacy verbose fields (used in older DB records)
  resolutionHoursCritical?: number;
  resolutionHoursHigh?: number;
  resolutionHoursMedium?: number;
  resolutionHoursLow?: number;
  escalationEmail?: string;
  autoEscalate?: boolean;
}

export const DEFAULT_SLA_CONFIG: SLAConfig = {
  critical: 1,
  high: 4,
  medium: 12,
  low: 48,
  resolutionHoursCritical: 12,
  resolutionHoursHigh: 24,
  resolutionHoursMedium: 48,
  resolutionHoursLow: 72,
};

// --- Notifications ---

export type NotificationType =
  | 'new_issue'
  | 'assignment'
  | 'status_change'
  | 'sla_warning'
  | 'sla_breach'
  | 'escalation'
  | 'resolution'
  | 'reopened'
  | 'feedback'
  | 'comment';

export interface BusinessNotification {
  id: string;
  businessId: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  issueId?: string;
  read: boolean;
  createdAt: string;
}

// --- QR Codes ---

export interface QRCodeRecord {
  id: string;
  businessId: string;
  locationId?: string;
  locationName?: string;
  slug: string;
  url: string;
  createdAt: string;
}

// --- Industry Types ---

export const INDUSTRY_TYPES = [
  'Manufacturing',
  'Hospitality',
  'Healthcare',
  'Education',
  'Retail',
  'Food & Beverage',
  'IT Services',
  'Logistics',
  'Construction',
  'Textile',
  'Real Estate',
  'Automotive',
  'Pharmaceutical',
  'Energy',
  'Agriculture',
  'Banking & Finance',
  'Telecommunications',
  'Entertainment',
  'Government',
  'Non-Profit',
  'Other',
] as const;

export const DEFAULT_ISSUE_CATEGORIES = [
  'Maintenance',
  'Electrical',
  'Plumbing',
  'Safety',
  'Infrastructure',
  'Housekeeping',
  'IT & Network',
  'Security',
  'Environmental',
  'Equipment',
  'Other',
] as const;

export const DEFAULT_DEPARTMENTS = [
  { name: 'Maintenance', color: '#2563eb', icon: 'wrench' },
  { name: 'Electrical', color: '#f59e0b', icon: 'zap' },
  { name: 'Safety', color: '#ef4444', icon: 'shield' },
  { name: 'IT & Network', color: '#8b5cf6', icon: 'monitor' },
  { name: 'Administration', color: '#06b6d4', icon: 'building2' },
] as const;

export const DEPARTMENT_COLORS = [
  '#2563eb', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6',
  '#06b6d4', '#ec4899', '#f97316', '#14b8a6', '#6366f1',
  '#84cc16', '#a855f7', '#0ea5e9', '#e11d48', '#d97706',
] as const;

export const INDUSTRY_PRESETS = [
  { name: 'Hospitality & Hotels', description: 'Hotels, resorts, restaurants & event venues' },
  { name: 'Retail & Shopping Malls', description: 'Retail chains, stores & commercial complexes' },
  { name: 'Healthcare & Hospitals', description: 'Clinics, hospitals & medical centers' },
  { name: 'Educational Institutions', description: 'Schools, colleges & university campuses' },
  { name: 'Real Estate & Facility Ops', description: 'Residential & commercial property management' },
  { name: 'Manufacturing & Industrial', description: 'Factories, warehouses & industrial parks' },
  { name: 'IT & Technology Parks', description: 'Tech hubs & corporate office campuses' }
];
