# 🏙️ Luminous Civic & Business Portal — Complete Project Documentation

> **AI-powered Public Problem Reporter, Resolver & Enterprise Business Portal**
>
> 1. **Civic Module:** Snap a photo of a civic issue → AI detects the problem → generates a legal-grade complaint → routes it to the right authority → track resolution in real time.
> 2. **Business & Industry Portal:** Multi-tenant platform for commercial enterprises, hospitality, healthcare, education, retail, real estate, and factories to collect issues via custom forms/QR codes → AI automated triage → SLA countdown tracking → department assignment & resolution workflow.

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Business Portal & Multi-Tenant Architecture](#2-business-portal--multi-tenant-architecture)
3. [End-to-End Business Workflow (Onboarding to Resolution)](#3-end-to-end-business-workflow-onboarding-to-resolution)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [How to Run](#6-how-to-run)
7. [Environment Variables](#7-environment-variables)
8. [Firebase Setup](#8-firebase-setup)
9. [All Pages & Routes](#9-all-pages--routes)
10. [Admin Panels & Control Centers](#10-admin-panels--control-centers)
11. [AI Integration & Automated Triage](#11-ai-integration--automated-triage)
12. [Database Schema & Collections](#12-database-schema--collections)
13. [Security & Access Control (RBAC)](#13-security--access-control-rbac)
14. [Key Components & Architecture](#14-key-components--architecture)
15. [Multilingual Support](#15-multilingual-support)
16. [Known Issues & Quick Reference](#16-known-issues--quick-reference)

---

## 1. Project Overview

**Luminous Civic** is a comprehensive dual-module application combining public civic issue resolution with an enterprise multi-tenant **Business Portal**.

### Core Civic User Flow
```
Citizen → Upload Photo → Fill Details → Click Generate Report
       → AI Analyzes Image → Legal Complaint Generated
       → Saved to Firestore → Citizen Tracks Status via ID
       → Admin Reviews & Updates Status → Resolution Complete
```

### Core Business Portal Flow
```
Super Admin Onboards Business → Admin Customizes Branding & Forms → QR Code Generated
       → Customer / Staff Scans QR & Submits Issue at /portal/:slug
       → Gemini AI Triages & Assigns Priority/Category + Computes SLA Deadline
       → Business Dashboard Assigns Department & Employee → Live SLA Countdown
       → Employee Resolves & Log Audit Notes → Reporter Tracks at /portal/track
```

---

## 2. Business Portal & Multi-Tenant Architecture

The **Business & Industry Module** transforms Luminous Civic into a scalable multi-tenant SaaS platform supporting commercial enterprises, hospitality, retail, healthcare, education, logistics, and property operations.

### Target Industry Presets
- **Hospitality & Hotels:** Guest feedback, room maintenance, housekeeping, room service issues.
- **Retail & Shopping Malls:** Store facilities, escalator maintenance, sanitation, security alerts.
- **Healthcare & Hospitals:** Equipment malfunctions, hygiene reporting, facility logistics.
- **Educational Institutions:** Campus maintenance, classroom equipment, safety reporting.
- **Real Estate & Facility Ops:** Tenant requests, HVAC issues, plumbing, emergency repairs.
- **Manufacturing & Industrial:** Factory floor hazards, machinery downtime, safety breaches.

### Key Business Portal Capabilities
- 🏢 **Multi-Tenant Isolation:** Each business has its own slug (`/portal/:slug`), departments, locations, SLA rules, custom forms, and employee roster.
- 📱 **QR Code Generation:** Location-based QR codes generated dynamically (`QRCodeGenerator.tsx`) for instant scan-to-report access (e.g. affixed on hotel room doors, restaurant tables, or machine units).
- 🛠️ **Dynamic Form Builder:** Visual drag-and-drop form builder (`BusinessFormBuilder.tsx`) with field validation, custom option lists, tooltips, photo uploads, rating inputs, and AI Form Generation.
- ⏱️ **SLA Management & Countdown Timers:** Custom SLA windows per priority level with visual timers (`SLATimer.tsx`), warning thresholds, and automatic breach escalations.
- 🤖 **Automated Gemini AI Triage:** Instant multi-modal analysis of incoming customer submissions to determine priority (`Critical`, `High`, `Medium`, `Low`), category, summary, estimated resolution hours, and suggested staff action steps.
- 👥 **Department & Employee Roster:** Assign issues to specific departments (`Maintenance`, `IT`, `Customer Service`) and track employee workload.
- 📊 **Real-time Analytics:** Charts for SLA breach rates, total volume, resolution speed, and department bottlenecks.

---

## 3. End-to-End Business Workflow (Onboarding to Resolution)

The complete lifecycle of a business tenant on Luminous Civic consists of **6 distinct stages**:

```
[STAGE 1: Super Admin Onboarding]
       │  Super Admin provisions new business tenant at /super-admin/businesses/new
       │  Sets slug, industry type, subscription tier & initial admin credentials
       ▼
[STAGE 2: Tenant Setup & Customization]
       │  Business Admin logs in at /business/login
       │  Configures Portal branding, Locations, Departments, Staff Roster & Custom Forms
       │  Downloads QR Codes for physical deployment
       ▼
[STAGE 3: Public / Customer Issue Intake]
       │  Customer / Staff scans QR Code or visits http://localhost:3000/portal/:slug
       │  Fills dynamic intake form, attaches photos, optional contact info (or anonymous)
       ▼
[STAGE 4: Automated AI Triage & SLA Calculation]
       │  Gemini AI analyzes text & images → categorizes issue & sets priority
       │  Generates tracking ID (LUM-26-XXXXX) & computes exact SLA deadline timestamp
       ▼
[STAGE 5: Staff Assignment, SLA Monitoring & Resolution]
       │  Issue appears on Business Dashboard (/business/issues)
       │  Assigned to Department & Employee → Live SLA timer monitors countdown
       │  Staff updates status (submitted → assigned → in_progress → resolved) & logs notes
       ▼
[STAGE 6: Public Tracking & Platform Analytics]
       │  Customer tracks resolution progress at /portal/track using tracking number
       │  Super Admin & Business Admin view performance metrics on Analytics Dashboards
```

### Stage-by-Stage Breakdown

#### 1️⃣ Stage 1: Onboarding & Tenant Provisioning (Super Admin)
1. Super Admin navigates to `/super-admin/businesses/new`.
2. Fills organization details: **Business Name**, **Public Portal Slug** (`/portal/grand-apex`), **Industry Category**, **Subscription Plan** (`Starter`, `Pro`, `Enterprise`), and optional **Logo**.
3. Inputs initial **Business Admin Account** details (Admin Name, Email, Password).
4. Submitting executes `createBusiness()`, which automatically:
   - Provisions Firestore document `/businesses/{businessId}`
   - Sets default SLA rules (Critical: 1-12h, High: 4-24h, Medium: 12-48h, Low: 48-72h)
   - Creates initial default departments (`dept_general`, `dept_ops`, `Customer Service`, `Maintenance & Repairs`)
   - Creates initial default locations (`Headquarters / Main Facility`)
   - Registers the Business Admin account via Firebase Auth (`registerBusinessUser()`) and caches credentials for offline access.

#### 2️⃣ Stage 2: Business Portal Configuration (Business Admin)
1. Business Admin signs into `/business/login` using provisioned credentials.
2. **Branding & Portal Settings (`/business/portal-settings`):** Configures title, banner message, primary color theme, contact email/phone, and anonymous submission permissions.
3. **Location Management (`/business/locations`):** Creates branches, buildings, floors, or rooms. Generates printable QR codes for venue installation.
4. **Department Management (`/business/departments`):** Establishes departments, assigns department heads, and selects color badges.
5. **Employee Roster (`/business/employees`):** Onboards managers and staff members, linking them to departments.
6. **Form Builder (`/business/forms/builder`):** Customizes public intake form fields manually or auto-generates templates using AI prompt assistance (`generateAIFormFields()`).

#### 3️⃣ Stage 3: Customer / Staff Issue Intake
1. Customer or internal staff member visits `/portal/:slug` (e.g. `/portal/grand-apex`) or scans location QR code.
2. Form renders dynamically using `FormFieldRenderer.tsx` based on the published form configuration.
3. Reporter fills required fields (subject, detailed description, category, rating, photo attachment).
4. Reporter chooses to provide contact info (Name, Email, Phone) or selects **"Submit Anonymously"**.
5. Clicks **Submit Report to Management**.

#### 4️⃣ Stage 4: Automated AI Triage & SLA Calculation
1. The submission triggers `analyzeBusinessReportAI()` in `businessAI.ts`.
2. Gemini 2.5 Flash analyzes text description, photo base64, and industry type to generate structured JSON:
   - **Category:** e.g., "Equipment Maintenance"
   - **Priority:** `Critical` | `High` | `Medium` | `Low`
   - **Summary:** Concise summary of the issue
   - **Suggested Action:** Recommended resolution step for staff
   - **Estimated Hours to Resolve:** e.g., 4 hours
   - **Tags:** Keyword tags
3. System assigns a tracking number: `LUM-26-XXXXX` (or legacy `LC-XXXXX`).
4. System computes `slaDeadline` timestamp by adding SLA priority hours to submission time.
5. Record saved to Firestore `/business_issues/{issueId}` and `/public_reports/{reportId}`.

#### 5️⃣ Stage 5: Department Assignment, SLA Monitoring & Resolution
1. Issue appears live in Business Issues list (`/business/issues`).
2. Staff and Managers review incoming issues, filtered by Status, Priority, Department, or SLA Warning.
3. **SLA Countdown Timer (`SLATimer.tsx`):** Displays real-time countdown with status indicators:
   - 🟢 **On Track:** >25% time remaining
   - 🟡 **Warning:** <25% time remaining
   - 🔴 **Breached:** SLA deadline passed
4. **Assignment:** Manager assigns issue to specific Department and Staff Member (`assignedEmployeeId`).
5. **Workflow Progression:** Status transitions: `new` → `assigned` → `in_progress` → `waiting` → `resolved` / `closed`.
6. **Timeline & Internal Audit Notes:** Staff append internal notes or status change records (`TimelineVertical.tsx`), updating `business_audit_logs`.

#### 6️⃣ Stage 6: Tracking & Analytics
1. **Public Tracking (`/portal/track`):** Reporter checks status using tracking number without login requirement.
2. **Business Analytics (`/business/analytics`):** Real-time analytics charts showing issue volume, resolution rates, SLA compliance %, average resolution time, and department distribution.
3. **Super Admin Analytics (`/super-admin/analytics`):** Global metrics spanning all business tenants on the platform.

---

## 4. Tech Stack

| Layer | Technology | Version | Description |
|---|---|---|---|
| Frontend Framework | React | 19.0.0 | UI rendering & component architecture |
| Language | TypeScript | ~5.8.2 | Type-safe application codebase |
| Build Tool | Vite | ^6.2.0 | Dev server & production bundler |
| Styling | Tailwind CSS v4 | ^4.1.14 | Modern utility-first CSS styling |
| Routing | React Router DOM | ^7.14.0 | Declarative client-side routing |
| Animations | Framer Motion | ^12.23.24 | Page transitions & micro-interactions |
| Icons | Lucide React | ^0.546.0 | Modern SVG icon set |
| AI Model | Google Gemini API (`@google/genai`) | ^1.29.0 | Image vision, report generation & business triage |
| Database | Firebase Firestore | ^12.11.0 | Real-time NoSQL database & offline storage |
| Authentication | Firebase Auth | ^12.11.0 | Google Sign-in + Business Email/Password auth |
| QR Code | Canvas / Utility | Built-in | Dynamic QR Code generation for venues |

---

## 5. Project Structure

```
luminous-civic/
│
├── index.html                    # Entry HTML file
├── package.json                  # Node dependencies & npm scripts
├── vite.config.ts                # Vite config + env handling
├── tsconfig.json                 # TypeScript compiler configuration
├── .env                          # 🔐 Environment variables
├── .env.example                  # Template for required env vars
├── firestore.rules               # Firestore security rules
│
└── src/
    ├── main.tsx                  # Application entry point
    ├── App.tsx                   # Main router, route guards & context providers
    ├── index.css                 # Global CSS + design tokens
    │
    ├── lib/                      # Core Services & Helpers
    │   ├── firebase.ts           # Firebase SDK initialization & Auth helpers
    │   ├── gemini.ts             # Civic AI analysis wrapper
    │   ├── utils.ts              # UI class merger (cn) & image compression
    │   ├── FirebaseProvider.tsx  # Civic Auth Context
    │   ├── LanguageProvider.tsx  # i18n Translation Context
    │   ├── translations.ts       # EN / Hindi / Marathi translations
    │   │
    │   └── business/             # 🏢 BUSINESS PORTAL MODULE
    │       ├── types.ts          # Complete Business TypeScript interfaces
    │       ├── businessDb.ts     # Business Firestore database operations
    │       ├── businessAuth.ts   # Business RBAC & login authentication
    │       ├── businessAI.ts     # Business Gemini AI triage service
    │       └── businessStorage.ts# Base64 file conversion utilities
    │
    ├── components/
    │   ├── Navbar.tsx            # Civic navigation header
    │   ├── Footer.tsx            # Civic footer
    │   ├── AdminRoute.tsx        # Civic Admin route protection guard
    │   ├── dashboard/            # Civic dashboard components
    │   │
    │   └── business/             # 🏢 BUSINESS PORTAL COMPONENTS
    │       ├── BusinessContext.tsx   # Active business context provider
    │       ├── BusinessLayout.tsx    # Tenant admin layout & sidebar
    │       ├── SuperAdminLayout.tsx  # Super Admin layout & sidebar
    │       ├── BusinessRoute.tsx     # Business tenant route guard
    │       ├── SuperAdminRoute.tsx   # Super Admin route guard
    │       ├── AIAnalysisCard.tsx    # AI triage summary card widget
    │       ├── FormFieldBuilder.tsx  # Drag-and-drop form field builder
    │       ├── FormFieldEditor.tsx   # Field modal editor
    │       ├── FormFieldRenderer.tsx # Dynamic public form renderer
    │       ├── IssueFilters.tsx      # Multi-criteria issue filtering bar
    │       ├── QRCodeGenerator.tsx   # Venue QR Code generator & printer
    │       ├── SLATimer.tsx          # Live SLA countdown badge & timer
    │       ├── StatusBadge.tsx       # Color-coded issue status pill
    │       └── TimelineVertical.tsx  # Vertical audit timeline viewer
    │
    └── pages/
        ├── Home.tsx              # Civic landing page & report submission
        ├── Login.tsx             # Civic Google Sign-in
        ├── Dashboard.tsx         # Citizen report dashboard
        ├── Track.tsx             # Public report tracker (Civic)
        ├── ReportDetail.tsx      # Civic report detail view
        ├── AdminDashboard.tsx    # Civic admin control panel
        ├── NewHome.tsx           # Modern portal landing showcase
        │
        ├── super-admin/          # 🔐 SUPER ADMIN MODULE PAGES
        │   ├── SuperAdminDashboard.tsx # Platform Overview & Global Stats
        │   ├── BusinessManagement.tsx  # Tenant directory & status controls
        │   ├── CreateBusiness.tsx      # New Tenant Onboarding Wizard
        │   ├── BusinessDetails.tsx     # Single tenant overview & quick actions
        │   ├── PlatformUsers.tsx       # Multi-tenant user directory
        │   ├── PlatformIssues.tsx      # Master issue search across all tenants
        │   ├── PlatformAnalytics.tsx   # Cross-tenant platform metrics
        │   └── PlatformSettings.tsx    # System configurations
        │
        ├── business/             # 🏢 BUSINESS TENANT MODULE PAGES
        │   ├── BusinessLogin.tsx       # Business portal login screen
        │   ├── BusinessDashboard.tsx   # Tenant admin summary & stats
        │   ├── BusinessIssues.tsx      # Tenant master issue management list
        │   ├── BusinessIssueDetail.tsx # Detailed issue view & resolution tools
        │   ├── BusinessFormBuilder.tsx # Custom intake form designer
        │   ├── BusinessPortalSettings.tsx # Public portal customization
        │   ├── BusinessDepartments.tsx # Department directory & heads
        │   ├── BusinessLocations.tsx   # Branch & QR Code manager
        │   ├── BusinessEmployees.tsx   # Staff roster & role manager
        │   ├── BusinessSettings.tsx    # SLA & tenant account settings
        │   └── BusinessAnalytics.tsx   # Business SLA & resolution performance
        │
        └── public/               # 🌐 PUBLIC PORTAL PAGES
            ├── PublicReportingPortal.tsx # Dynamic business intake portal (/portal/:slug)
            ├── PublicIssueTracker.tsx    # Business tracking lookup (/portal/track)
            └── ReportSuccess.tsx         # Submission confirmation & tracking card
```

---

## 6. How to Run

### Prerequisites
- **Node.js 18+** (recommended v20+)
- **npm** (comes with Node.js)

### Quick Start Commands

```powershell
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Open browser at: **http://localhost:3000**

### Primary Entry URLs
- **Main Civic Portal:** `http://localhost:3000/`
- **Civic Admin Panel:** `http://localhost:3000/admin`
- **Business Portal Login:** `http://localhost:3000/business/login`
- **Super Admin Panel:** `http://localhost:3000/super-admin/dashboard`
- **Public Business Intake:** `http://localhost:3000/portal/grand-apex`
- **Business Issue Tracker:** `http://localhost:3000/portal/track`

---

## 7. Environment Variables

Create `.env` in the root folder:

```env
# Required: Gemini API Key for AI Analysis & Form Generation
GEMINI_API_KEY="your_gemini_api_key_here"

# Application Base URL
APP_URL="http://localhost:3000"
```

---

## 8. Firebase Setup

- **Project ID:** `gen-lang-client-0215891879`
- **Auth Domain:** `gen-lang-client-0215891879.firebaseapp.com`
- **Firestore Database ID:** `ai-studio-16fed12b-13b6-4629-980a-f11d364f8016`
- **Config File:** `firebase-applet-config.json`

### Deployment Commands
```bash
# Deploy Firestore security rules
firebase deploy --only firestore:rules
```

---

## 9. All Pages & Routes

### 🏙️ Civic Routes
| Route | Page Component | Access Level | Description |
|---|---|---|---|
| `/` | `Home.tsx` | Public | Civic landing page + AI photo reporter |
| `/new_home` | `NewHome.tsx` | Public | Modern platform landing showcase |
| `/login` | `Login.tsx` | Public | Google Sign-in for citizens |
| `/dashboard` | `Dashboard.tsx` | Logged in User | Citizen personal submitted reports |
| `/track` | `Track.tsx` | Public | Public status tracker for civic reports |
| `/report` | `ReportDetail.tsx` | Public | Detailed view of a specific report |
| `/admin` | `AdminDashboard.tsx` | **Civic Admin** | Admin management panel for civic issues |

### 🔐 Super Admin Routes
| Route | Page Component | Access Level | Description |
|---|---|---|---|
| `/super-admin/dashboard` | `SuperAdminDashboard.tsx` | **Super Admin** | Platform-wide overview & tenant metrics |
| `/super-admin/businesses` | `BusinessManagement.tsx` | **Super Admin** | Business tenant directory & status management |
| `/super-admin/businesses/new` | `CreateBusiness.tsx` | **Super Admin** | New business onboarding wizard |
| `/super-admin/businesses/:id` | `BusinessDetails.tsx` | **Super Admin** | Single business overview & actions |
| `/super-admin/users` | `PlatformUsers.tsx` | **Super Admin** | Master user directory across all tenants |
| `/super-admin/issues` | `PlatformIssues.tsx` | **Super Admin** | Master issue listing across all tenants |
| `/super-admin/analytics` | `PlatformAnalytics.tsx` | **Super Admin** | Platform analytics & SLA performance |
| `/super-admin/settings` | `PlatformSettings.tsx` | **Super Admin** | System configurations & global settings |

### 🏢 Business Tenant Routes
| Route | Page Component | Access Level | Description |
|---|---|---|---|
| `/business/login` | `BusinessLogin.tsx` | Public | Business tenant & super admin login page |
| `/business/dashboard` | `BusinessDashboard.tsx` | **Business User** | Tenant dashboard summary & stats |
| `/business/issues` | `BusinessIssues.tsx` | **Business User** | Tenant issue management list & filters |
| `/business/issues/:id` | `BusinessIssueDetail.tsx` | **Business User** | Detailed issue view & resolution tools |
| `/business/forms/builder` | `BusinessFormBuilder.tsx` | **Business Admin** | Custom intake form designer |
| `/business/portal-settings` | `BusinessPortalSettings.tsx` | **Business Admin** | Public portal branding & messaging |
| `/business/departments` | `BusinessDepartments.tsx` | **Business Admin** | Department directory & head assignment |
| `/business/locations` | `BusinessLocations.tsx` | **Business Admin** | Location directory & QR code generator |
| `/business/employees` | `BusinessEmployees.tsx` | **Business Admin** | Employee roster & role configuration |
| `/business/settings` | `BusinessSettings.tsx` | **Business Admin** | SLA thresholds & business account setup |
| `/business/analytics` | `BusinessAnalytics.tsx` | **Business User** | Business SLA & resolution performance charts |

### 🌐 Public Business Portal Routes
| Route | Page Component | Access Level | Description |
|---|---|---|---|
| `/portal/:slug` | `PublicReportingPortal.tsx` | Public | Dynamic business intake portal for customers |
| `/portal/track` | `PublicIssueTracker.tsx` | Public | Business issue tracker by tracking number |
| `/portal/success/:trackingNumber` | `ReportSuccess.tsx` | Public | Submission confirmation & tracking card |

---

## 10. Admin Panels & Control Centers

### 1. Civic Admin Panel (`/admin`)
- **Protected by:** `AdminRoute.tsx`
- **Authorized Email:** `jaysaner2006@gmail.com`
- **Purpose:** Manage civic reports (Processing → Authority Notified → Unit Assigned → Resolved).

### 2. Super Admin Control Center (`/super-admin/*`)
- **Protected by:** `SuperAdminRoute.tsx`
- **Authorized Email:** `jaysaner2006@gmail.com`
- **Purpose:** Full platform administration across all business tenants.
- **Capabilities:**
  - Onboard new business tenants via Onboarding Wizard.
  - Activate, suspend, or update business subscription tiers (`Starter`, `Pro`, `Enterprise`).
  - View cross-tenant platform analytics, master issue lists, and user accounts.

### 3. Business Tenant Admin Dashboard (`/business/*`)
- **Protected by:** `BusinessRoute.tsx`
- **Authorized Roles:** `admin`, `manager`, `staff`, `business_owner`, `business_manager`, `business_employee`.
- **Purpose:** Manage tenant-specific operations, assign issues to staff, monitor SLA countdowns, customize public form fields, print venue QR codes, and analyze resolution performance.

---

## 11. AI Integration & Automated Triage

Luminous Civic leverages **Google Gemini AI** across both modules:

### Civic AI Analysis (`src/lib/gemini.ts`)
- **Model:** `gemini-3-flash-preview`
- **Function:** `analyzeCivicIssue(imageBase64)`
- **Output:** Issue Type, Severity, Responsible Authority, Formal Legal Complaint.

### Business AI Triage (`src/lib/business/businessAI.ts`)
- **Model:** `gemini-2.5-flash`
- **Function:** `analyzeBusinessReportAI(title, description, imageBase64, industryType)`
- **Output:**
  - **Category:** Categorizes issue based on industry context.
  - **Priority:** Rates urgency as `Low`, `Medium`, `High`, or `Critical`.
  - **Summary:** Concise AI summary of customer complaint.
  - **Suggested Action:** Actionable step-by-step resolution advice for staff.
  - **Estimated Hours:** Estimated hours needed to resolve.
  - **Tags:** Relevant taxonomy tags.
- **Fallback Engine:** Intelligent keyword fallback parser `getFallbackBusinessAI()` guarantees continuous operation even if offline or if API quotas are exceeded.
- **AI Form Generator (`generateAIFormFields()`):** Dynamically generates industry-specific form schemas based on prompt inputs.

---

## 12. Database Schema & Collections

### Firestore Collections

#### `/businesses/{businessId}`
```typescript
{
  id: string;                   // Tenant doc ID
  name: string;                 // Business Name (e.g. "Grand Apex Resort")
  slug: string;                 // Public portal URL slug (e.g. "grand-apex")
  industryType: string;         // e.g. "Hospitality & Hotels"
  subscriptionPlan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'active' | 'inactive' | 'suspended';
  logoUrl?: string;             // Base64 or URL logo
  portalConfig: {               // Portal settings
    title?: string;
    description?: string;
    primaryColor?: string;
    welcomeMessage?: string;
    anonymousReporting?: boolean;
  };
  slaConfig: {                  // SLA resolution hours
    critical: number;           // e.g. 1 hour
    high: number;               // e.g. 4 hours
    medium: number;             // e.g. 12 hours
    low: number;                // e.g. 48 hours
  };
  departments: { id: string; name: string; code?: string }[];
  locations: { id: string; name: string; address?: string }[];
  createdAt: string;
}
```

#### `/business_users/{uid}`
```typescript
{
  uid: string;                  // Firebase Auth UID
  businessId: string;           // Associated tenant ID
  email: string;                // User email
  name: string;                 // User full name
  role: 'admin' | 'manager' | 'staff' | 'business_owner' | 'business_manager' | 'business_employee';
  departmentId?: string;        // Assigned department
  status: 'active' | 'inactive';
  passwordHash?: string;        // Local verification fallback
  createdAt: string;
}
```

#### `/business_issues/{issueId}`
```typescript
{
  id: string;                   // Doc ID
  businessId: string;           // Associated business tenant
  trackingNumber: string;       // Public tracking ID (e.g. "LUM-26-48201")
  title: string;                // Issue title
  description: string;          // Full problem description
  category: string;             // e.g. "Maintenance"
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'new' | 'assigned' | 'in_progress' | 'waiting' | 'resolved' | 'closed' | 'rejected';
  locationName?: string;        // Specific location/room
  assignedDepartmentId?: string;// Target department
  assignedToName?: string;      // Staff member assigned
  reporterName?: string;        // Customer name (or "Anonymous")
  reporterEmail?: string;
  images?: string[];            // Base64 photos
  fieldValues?: Record<string, any>; // Dynamic custom form responses
  slaDeadline: string;          // Calculated ISO timestamp deadline
  slaStatus: 'on_track' | 'warning' | 'breached';
  aiAnalysis?: BusinessAIAnalysis; // Complete Gemini AI triage object
  createdAt: string;
  resolvedAt?: string;
}
```

#### `/custom_forms/{formId}`
```typescript
{
  id: string;
  businessId: string;
  title: string;
  description: string;
  fields: FormField[];         // Array of dynamic form fields
  published: boolean;
  updatedAt: string;
}
```

#### `/business_locations/{locationId}`
```typescript
{
  id: string;
  businessId: string;
  name: string;                // e.g. "Room 304" or "Main Lobby"
  address?: string;
  qrCodeData?: string;         // Base64 QR code image
  createdAt: string;
}
```

#### `/business_audit_logs/{logId}`
```typescript
{
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  action: string;              // e.g. "Status changed from assigned to resolved"
  timestamp: string;
}
```

---

## 13. Security & Access Control (RBAC)

Luminous Civic implements multi-layer authorization combining frontend route guards (`SuperAdminRoute`, `BusinessRoute`, `AdminRoute`) and backend Firestore security rules (`firestore.rules`).

### Access Matrix

| Role | Civic Admin (`/admin`) | Super Admin (`/super-admin/*`) | Business Admin (`/business/*`) | Public Portal (`/portal/*`) |
|---|---|---|---|---|
| **Super Admin** (`jaysaner2006@gmail.com`) | ✅ Full Access | ✅ Full Access | ✅ Access Any Tenant | ✅ Access |
| **Business Owner / Admin** | ❌ Access Denied | ❌ Access Denied | ✅ Full Tenant Control | ✅ Access |
| **Business Manager** | ❌ Access Denied | ❌ Access Denied | ✅ Manage Issues & Staff | ✅ Access |
| **Business Staff / Employee** | ❌ Access Denied | ❌ Access Denied | ✅ Assigned Issues & Notes | ✅ Access |
| **Public Guest / Customer** | ❌ Access Denied | ❌ Access Denied | ❌ Access Denied | ✅ Submit & Track |

---

## 14. Key Components & Architecture

### Business Core Components
- `BusinessContext.tsx`: React Context providing the currently authenticated business tenant, user profile, active business ID, and reload functions.
- `BusinessRoute.tsx`: Route guard enforcing business tenant user authentication.
- `SuperAdminRoute.tsx`: Route guard enforcing Platform Super Admin permissions (`jaysaner2006@gmail.com`).
- `FormFieldBuilder.tsx` & `FormFieldEditor.tsx`: Visual drag-and-drop form builder component with property editors for labels, placeholders, requirement flags, option lists, and validation rules.
- `FormFieldRenderer.tsx`: Dynamic form renderer that renders appropriate inputs (text, select, radio, rating, file upload, etc.) based on form field JSON schemas.
- `SLATimer.tsx`: Live updating SLA countdown component displaying remaining time or breach duration with color-coded status badges.
- `QRCodeGenerator.tsx`: Generates location-specific QR codes with instant print and download actions.
- `AIAnalysisCard.tsx`: Displays structured Gemini AI analysis insights (Category, Urgency, Suggested Action, Estimated Resolution Time, Tags).
- `TimelineVertical.tsx`: Renders an interactive vertical audit log showing history, status changes, and staff notes.

---

## 15. Multilingual Support

Three primary languages are supported across the civic application:

| Language | Code | Coverage |
|---|---|---|
| English | `en` | Full |
| Hindi | `hi` | Full |
| Marathi | `mr` | Full |

- Translation dictionary in `src/lib/translations.ts`.
- Managed via `LanguageProvider.tsx` context.

---

## 16. Known Issues & Quick Reference

### Developer Notes
- **Local Fallback Auth:** If Firebase Email/Password Auth is disabled in the Firebase Console, the system falls back to stored local credentials to ensure uninterrupted development and testing.
- **Image Size Limit:** User uploads are automatically compressed using `compressImage()` to stay under Firestore document size limits (1MB).
- **Admin Accounts:**
  - **Super Admin Email:** `jaysaner2006@gmail.com`
  - **Super Admin Fallback Password:** `Admin@123`

---

## 📞 Quick Reference Summary

| Service | Value / URL |
|---|---|
| **Dev Server URL** | http://localhost:3000 |
| **Civic Admin Panel** | http://localhost:3000/admin |
| **Super Admin Dashboard** | http://localhost:3000/super-admin/dashboard |
| **Business Portal Login** | http://localhost:3000/business/login |
| **Sample Public Portal** | http://localhost:3000/portal/grand-apex |
| **Public Issue Tracker** | http://localhost:3000/portal/track |
| **Super Admin Email** | `jaysaner2006@gmail.com` |
| **Firebase Project** | `gen-lang-client-0215891879` |
| **AI Models Used** | `gemini-3-flash-preview` (Civic), `gemini-2.5-flash` (Business) |

---

*Last updated: September 2026 | Luminous Civic & Business Portal v2.0*

