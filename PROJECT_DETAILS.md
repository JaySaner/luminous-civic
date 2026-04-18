# 🏙️ Luminous Civic — Complete Project Documentation

> **AI-powered Public Problem Reporter & Resolver**
> Snap a photo of a civic issue → AI detects the problem → generates a legal-grade complaint → routes it to the right authority → track resolution in real time.

---

## 📌 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [How to Run](#4-how-to-run)
5. [Environment Variables](#5-environment-variables)
6. [Firebase Setup](#6-firebase-setup)
7. [All Pages & Routes](#7-all-pages--routes)
8. [Admin Panel](#8-admin-panel)
9. [AI Integration](#9-ai-integration)
10. [Database Schema](#10-database-schema)
11. [Security & Access Control](#11-security--access-control)
12. [Key Components](#12-key-components)
13. [Multilingual Support](#13-multilingual-support)
14. [Known Issues & Notes](#14-known-issues--notes)

---

## 1. Project Overview

**Luminous Civic** is a full-stack civic reporting web application that uses Google Gemini AI to:

- **Analyze images** of civic problems (potholes, broken lights, garbage, etc.)
- **Identify the issue** type and severity
- **Map the responsible authority** (Municipal Corporation, PWD, MSEDCL, etc.)
- **Generate a legal-grade formal complaint** automatically
- **Save the report** to a Firebase Firestore database
- **Allow citizens** to track their report status in real time
- **Allow admins** to manage all reports and update their resolution status

### Core User Flow
```
Citizen → Upload Photo → Fill Name & Address → Click Generate Report
       → AI Analyzes Image → Legal Complaint Generated
       → Report Saved to Firestore → Citizen Redirected to Report Page
       → Admin Reviews & Updates Status → Citizen Sees Status Change
```

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 19.0.0 |
| Language | TypeScript | ~5.8.2 |
| Build Tool | Vite | ^6.2.0 |
| Styling | Tailwind CSS v4 | ^4.1.14 |
| Routing | React Router DOM | ^7.14.0 |
| Animations | Framer Motion (motion/react) | ^12.23.24 |
| Icons | Lucide React | ^0.546.0 |
| AI | Google Gemini API (@google/genai) | ^1.29.0 |
| Database | Firebase Firestore | ^12.11.0 |
| Authentication | Firebase Auth (Google Sign-In) | ^12.11.0 |
| CSS Utilities | clsx + tailwind-merge | latest |
| Fonts | Plus Jakarta Sans, Manrope (Google Fonts) | — |

---

## 3. Project Structure

```
luminous-civic/
│
├── index.html                    # HTML entry point (title + root div)
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite config (reads .env, Tailwind plugin)
├── tsconfig.json                 # TypeScript config
├── .env                          # 🔐 Your secret keys (NOT committed to git)
├── .env.example                  # Template showing required env vars
├── .gitignore                    # Ignores node_modules, dist, .env
│
├── firebase-applet-config.json   # Firebase project credentials
├── firebase-blueprint.json       # Data model documentation
├── firestore.rules               # Firestore security rules
│
└── src/
    ├── main.tsx                  # App entry: mounts React root
    ├── App.tsx                   # Router, providers, ErrorBoundary
    ├── index.css                 # Global styles + Tailwind theme tokens
    │
    ├── lib/
    │   ├── firebase.ts           # Firebase init, auth helpers, error handling
    │   ├── gemini.ts             # Gemini AI API wrapper
    │   ├── utils.ts              # cn() utility + compressImage()
    │   ├── FirebaseProvider.tsx  # Auth state React context
    │   ├── LanguageProvider.tsx  # i18n React context
    │   └── translations.ts       # EN / Hindi / Marathi translations
    │
    ├── components/
    │   ├── Navbar.tsx            # Top navigation bar
    │   ├── Footer.tsx            # Page footer
    │   ├── AdminRoute.tsx        # Route guard (admin-only access)
    │   └── dashboard/
    │       ├── DashboardLayout.tsx
    │       ├── FeedbackModal.tsx
    │       ├── IssueCard.tsx
    │       ├── IssueDetails.tsx
    │       ├── Notification.tsx
    │       └── Timeline.tsx
    │
    └── pages/
        ├── Home.tsx              # Landing page + report submission form
        ├── Login.tsx             # Google Sign-In page
        ├── Dashboard.tsx         # Citizen's personal report dashboard
        ├── Track.tsx             # Public report status tracker
        ├── ReportDetail.tsx      # Full report view page
        └── AdminDashboard.tsx    # 🔐 Admin-only control panel
```

---

## 4. How to Run

### Prerequisites
- **Node.js 18+** — download from https://nodejs.org
- **npm** — comes with Node.js

### Steps

```powershell
# 1. Navigate to project folder
cd "c:\Users\GAMING\Downloads\luminous-civic (2)"

# 2. Install dependencies (first time only)
npm install

# 3. Add your API keys to .env (see Section 5)

# 4. Start development server
npm run dev
```

Open browser at: **http://localhost:3000**

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at localhost:3000 with hot reload |
| `npm run build` | Build production bundle to `/dist` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type check (0 errors = all good) |

---

## 5. Environment Variables

Create a `.env` file in the root folder (already created):

```env
# Required: Get from https://aistudio.google.com/apikey
GEMINI_API_KEY="your_gemini_api_key_here"

# The app URL (localhost for development)
APP_URL="http://localhost:3000"
```

> ⚠️ The `.env` file is in `.gitignore` — it is NEVER committed to git.
> The `GEMINI_API_KEY` is injected at build time by `vite.config.ts` via `process.env.GEMINI_API_KEY`.

---

## 6. Firebase Setup

### Firebase Project
- **Project ID:** `gen-lang-client-0215891879`
- **Auth Domain:** `gen-lang-client-0215891879.firebaseapp.com`
- **Firestore Database ID:** `ai-studio-16fed12b-13b6-4629-980a-f11d364f8016`
- **Config file:** `firebase-applet-config.json`

### Required Firebase Console Steps (one-time setup)

1. Go to **https://console.firebase.google.com**
2. Open project **gen-lang-client-0215891879**
3. **Enable Google Sign-In:**
   - Authentication → Sign-in method → Google → Enable → Save
4. **Authorize localhost:**
   - Authentication → Settings → Authorized domains → Add `localhost`
5. **Deploy Firestore Rules:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only firestore:rules
   ```

---

## 7. All Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/` | `Home.tsx` | Public | Landing page with image upload + AI report generation |
| `/login` | `Login.tsx` | Public | Google Sign-In page (redirects home if already logged in) |
| `/dashboard` | `Dashboard.tsx` | Logged in | Shows all reports submitted by the current user |
| `/track` | `Track.tsx` | Public | Enter any Report ID to check its status |
| `/report?id=LC-XXXXX` | `ReportDetail.tsx` | Public | Detailed view of a specific report |
| `/admin` | `AdminDashboard.tsx` | **Admin only** | Admin control panel — manage all reports |

---

## 8. Admin Panel

### Access
- URL: `http://localhost:3000/admin`
- **Only accessible to:** `jaysaner2006@gmail.com`
- All other users are silently redirected to the homepage

### How to Access
1. Sign in at http://localhost:3000 with `jaysaner2006@gmail.com`
2. A **🔒 Admin** link appears in the navigation bar (invisible to all other users)
3. Click it to open the Admin Control Panel

### Features
| Feature | Description |
|---|---|
| **Stats Cards** | Shows count of reports by each status — click to filter |
| **Search** | Filter by Report ID, Name, Address, Issue Type, or Authority |
| **Status Filter** | Click stat cards to filter by Processing / Notified / Assigned / Resolved |
| **Status Update** | Dropdown to update any report through all 4 stages |
| **Expandable Detail** | View full image, complete legal complaint, location info, report meta |
| **Real-time** | Uses Firestore `onSnapshot` — updates live without page refresh |

### Report Status Flow (Admin Updates)
```
Processing → Authority Notified → Unit Assigned → Resolved
```

### Security (Two Layers)
1. **Frontend:** `AdminRoute.tsx` — checks email, redirects non-admins
2. **Backend:** `firestore.rules` — server-side enforcement via `isAdmin()` function

---

## 9. AI Integration

### Model Used
- **Model:** `gemini-3-flash-preview`
- **Library:** `@google/genai`
- **File:** `src/lib/gemini.ts`

### What the AI Does
When a citizen uploads an image, the AI:
1. Analyzes the image using computer vision
2. Identifies the civic issue type (pothole, broken streetlight, garbage, etc.)
3. Rates the severity: `Low / Medium / High / Critical`
4. Determines the responsible authority (e.g., "Municipal Corporation Public Works Dept")
5. Writes a brief description
6. Drafts a professional **legal-grade complaint** citing civic ordinances
7. Attempts to identify the location

### AI Response Schema
```typescript
interface AnalysisResult {
  issueType: string;           // e.g., "Pothole"
  severity: "Low" | "Medium" | "High" | "Critical";
  authority: string;           // e.g., "Municipal Corporation"
  description: string;         // Brief AI description
  legalComplaint: string;      // Full formal complaint text
  location: string;            // Detected location (if possible)
}
```

---

## 10. Database Schema

### Firestore Collections

#### `/users/{userId}`
```typescript
{
  uid: string;           // Firebase Auth UID
  email: string;         // User's email
  displayName: string;   // Google display name
  photoURL: string;      // Google profile photo URL
  role: "citizen" | "admin";
  createdAt: string;     // ISO date string
}
```

#### `/reports/{reportId}`
```typescript
{
  id: string;            // e.g., "LC-12345"
  userId: string;        // Who submitted it
  name: string;          // Reporter's full name
  address: string;       // Incident location
  email: string;         // Reporter's email
  description: string;   // Citizen's description
  issueType: string;     // AI-detected issue type
  location: string;      // AI-detected location
  authority: string;     // Responsible department
  legalComplaint: string;// AI-generated formal complaint
  preview: string;       // Base64 compressed image
  status: "Processing" | "Authority Notified" | "Unit Assigned" | "Resolved";
  createdAt: string;     // ISO date string
}
```

---

## 11. Security & Access Control

### Who Can Do What

| Action | Citizen (Own Reports) | Citizen (Others' Reports) | Admin |
|---|---|---|---|
| Read own profile | ✅ | ❌ | ✅ |
| Create own profile | ✅ | ❌ | ✅ |
| Submit report | ✅ | ❌ | ✅ |
| Read own reports | ✅ | ❌ | ✅ |
| Read all reports | ❌ | ❌ | ✅ |
| Update report status | ❌ | ❌ | ✅ |
| Delete reports | ❌ | ❌ | ✅ |
| Access /admin route | ❌ | ❌ | ✅ |

### Admin Email
- Hardcoded in **two places** (change both if needed):
  1. `src/components/AdminRoute.tsx` — line 5: `const ADMIN_EMAIL = 'jaysaner2006@gmail.com'`
  2. `src/components/Navbar.tsx` — line 9: `const ADMIN_EMAIL = 'jaysaner2006@gmail.com'`
  3. `firestore.rules` — line 53: `request.auth.token.email == "jaysaner2006@gmail.com"`

---

## 12. Key Components

### `FirebaseProvider.tsx`
- Wraps the entire app
- Listens to auth state changes via `onAuthStateChanged`
- Provides `{ user, loading }` to all components via `useFirebase()` hook
- Runs `testConnection()` on boot to verify Firestore connectivity

### `AdminRoute.tsx`
- Protects the `/admin` route
- Shows loading spinner while auth resolves
- Redirects to `/login` if not logged in
- Redirects to `/` if logged in but not admin email

### `Navbar.tsx`
- Hides completely on `/dashboard` (dashboard has its own layout)
- Shows 🔒 Admin link only for admin email
- Includes EN / हिन्दी / मराठी language switcher
- Responsive mobile menu

### `gemini.ts`
- Single function: `analyzeCivicIssue(imageBase64)`
- Uses structured JSON output schema
- Returns typed `AnalysisResult` object

### `utils.ts`
- `cn()` — merges Tailwind classes cleanly
- `compressImage()` — compresses image to max 800×800px, 70% quality before saving to Firestore (keeps under Firestore 1MB field limit)

---

## 13. Multilingual Support

Three languages supported across the app:

| Language | Code | Coverage |
|---|---|---|
| English | `en` | Full |
| Hindi | `hi` | Full |
| Marathi | `mr` | Full |

- Translation keys are in `src/lib/translations.ts`
- Language state managed by `LanguageProvider.tsx`
- Switchable from Navbar (desktop: EN/हिन्दी/मराठी pills; mobile: same)
- Switchable from Home page hero section

---

## 14. Known Issues & Notes

### Important Notes
- **Image size:** Images are compressed to max 800×800px before saving. Very large images may still cause issues.
- **Firestore rules must be deployed** for the app to work in production. For local dev, rules are evaluated if using the real Firestore project.
- **Gemini API key required** — without it, clicking "Generate Report" will fail silently or show an error.
- **Google Sign-In requires popup permission** — if browser blocks popups on localhost, allow it and try again.

### Browser Requirements
- Chrome / Edge / Firefox (latest)
- Camera & Location permissions required for full functionality

### Changing Admin Email
If you want to use a different admin email, update all 3 locations:
1. `src/components/AdminRoute.tsx` — `ADMIN_EMAIL` constant
2. `src/components/Navbar.tsx` — `ADMIN_EMAIL` constant
3. `firestore.rules` — line 53 email string
4. Re-deploy Firestore rules: `firebase deploy --only firestore:rules`

---

## 📞 Quick Reference

| Item | Value |
|---|---|
| Dev server URL | http://localhost:3000 |
| Admin panel URL | http://localhost:3000/admin |
| Admin email | jaysaner2006@gmail.com |
| Firebase project | gen-lang-client-0215891879 |
| Firebase console | https://console.firebase.google.com |
| Gemini API key | https://aistudio.google.com/apikey |
| AI model used | gemini-3-flash-preview |

---

*Last updated: April 2026 | Luminous Civic v0.0.0*
