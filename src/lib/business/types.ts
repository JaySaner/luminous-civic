// ============================================================
// Luminous Civic — Business / Industries Module Types
// ============================================================

// --- Business Entity ---

export type BusinessStatus = 'active' | 'suspended' | 'pending';
export type BusinessPlan = 'basic' | 'business' | 'pro' | 'enterprise';

export interface Business {
  id: string; // Firestore doc ID
  businessId: string; // Human-readable ID e.g. BUS-00124
  name: string;
  slug: string; // URL-safe slug for public portal
  industry: string;
  description: string;
  registrationNumber?: string;
  website?: string;
  phone?: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode?: string;
  logoBase64?: string; // Base64 logo for MVP (no Firebase Storage needed)
  status: BusinessStatus;
  plan: BusinessPlan;
  ownerId?: string; // Firebase Auth UID of owner (set after owner claims account)
  ownerEmail: string;
  ownerName: string;
  ownerPhone?: string;
  portalConfig: PortalConfig;
  slaConfig: SLAConfig;
  operatingHours?: string;
  timezone?: string;
  expectedUsers?: number;
  createdAt: string; // ISO date
  updatedAt: string;
}

export interface PortalConfig {
  title?: string;
  description?: string;
  primaryColor?: string;
  welcomeMessage?: string;
  reportingInstructions?: string;
  anonymousReporting: boolean;
  contactEmail?: string;
  contactPhone?: string;
}

// --- Business Users ---

export type BusinessUserRole = 'business_owner' | 'business_manager' | 'business_employee';
export type BusinessUserStatus = 'active' | 'inactive' | 'pending_setup';

export interface BusinessUser {
  id: string;
  uid: string; // Firebase Auth UID
  businessId: string;
  email: string;
  name: string;
  phone?: string;
  role: BusinessUserRole;
  departmentId?: string;
  departmentName?: string;
  status: BusinessUserStatus;
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
  isPrimary: boolean;
  qrCodeData?: string;
  createdAt: string;
}

// --- Departments ---

export interface Department {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  color: string; // hex color for display
  icon?: string; // lucide icon name
  headUserId?: string;
  headUserName?: string;
  userCount: number;
  createdAt: string;
}

// --- Custom Forms ---

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'location'
  | 'image_upload'
  | 'video_upload'
  | 'document_upload'
  | 'phone'
  | 'email'
  | 'rating'
  | 'section'
  | 'instructions';

export interface CustomFormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For dropdown, radio, checkbox
  helpText?: string;
  order: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string[];
}

export interface CustomForm {
  id: string; // doc ID = businessId
  businessId: string;
  fields: CustomFormField[];
  version: number;
  published: boolean;
  updatedAt: string;
  createdAt: string;
}

// --- Business Issues ---

export type IssuePriority = 'critical' | 'high' | 'medium' | 'low';
export type IssueStatus =
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
  id: string;
  type: 'image' | 'video' | 'document';
  name: string;
  data: string; // Base64 data for MVP
  mimeType: string;
  size: number; // bytes
}

export interface BusinessIssue {
  id: string; // Firestore doc ID
  businessId: string;
  trackingId: string; // e.g. LC-10482
  title: string;
  description: string;
  category?: string;
  subcategory?: string;
  priority: IssuePriority;
  status: IssueStatus;
  locationId?: string;
  locationName?: string;
  departmentId?: string;
  departmentName?: string;
  assignedTo?: string; // UID
  assignedToName?: string;
  reporterName?: string;
  reporterEmail?: string;
  reporterPhone?: string;
  attachments: IssueAttachment[];
  formData?: Record<string, any>; // Custom form field values
  formVersion?: number; // Form version at time of submission
  slaDeadline?: string; // ISO date
  slaStatus?: 'on_track' | 'warning' | 'breached';
  aiAnalysisId?: string;
  aiStatus: 'pending' | 'completed' | 'failed' | 'skipped';
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
}

// --- AI Analysis ---

export interface AIBusinessAnalysis {
  id: string;
  issueId: string;
  businessId: string;
  issueType: string;
  category: string;
  subcategory?: string;
  priority: IssuePriority;
  confidence: number; // 0–1
  suggestedDepartment?: string;
  risk?: string;
  suggestedActions: string[];
  potentialDuplicate: boolean;
  duplicateIssueId?: string;
  similarityScore?: number;
  summary: string;
  status: 'pending' | 'completed' | 'failed';
  analyzedAt?: string;
  createdAt: string;
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
  isInternal: boolean; // Internal notes not visible to reporter
  createdAt: string;
}

// --- Issue Status History ---

export interface IssueStatusChange {
  id: string;
  issueId: string;
  businessId: string;
  fromStatus: IssueStatus | null;
  toStatus: IssueStatus;
  changedBy: string; // UID
  changedByName: string;
  reason?: string;
  createdAt: string;
}

// --- Issue Feedback ---

export interface IssueFeedback {
  id: string;
  issueId: string;
  businessId: string;
  resolved: boolean;
  rating?: number; // 1–5
  comment?: string;
  createdAt: string;
}

// --- SLA ---

export interface SLAConfig {
  critical: number; // hours
  high: number;
  medium: number;
  low: number;
}

export const DEFAULT_SLA_CONFIG: SLAConfig = {
  critical: 1,
  high: 4,
  medium: 12,
  low: 48,
};

// --- Escalation ---

export interface EscalationRecord {
  id: string;
  issueId: string;
  businessId: string;
  fromUserId?: string;
  fromUserName?: string;
  toUserId?: string;
  toUserName?: string;
  level: number; // 1 = employee, 2 = manager, 3 = admin, 4 = owner
  reason: string;
  createdAt: string;
}

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
  userId: string; // recipient UID
  type: NotificationType;
  title: string;
  message: string;
  issueId?: string;
  read: boolean;
  createdAt: string;
}

// --- Audit Logs ---

export interface AuditLog {
  id: string;
  businessId?: string; // null for platform-level actions
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: string;
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

// --- Default Categories ---

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

// --- Default Departments ---

export const DEFAULT_DEPARTMENTS = [
  { name: 'Maintenance', color: '#2563eb', icon: 'wrench' },
  { name: 'Electrical', color: '#f59e0b', icon: 'zap' },
  { name: 'Safety', color: '#ef4444', icon: 'shield' },
  { name: 'IT & Network', color: '#8b5cf6', icon: 'monitor' },
  { name: 'Administration', color: '#06b6d4', icon: 'building2' },
] as const;

// --- Department Color Palette ---

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

