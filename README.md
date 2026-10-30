# AICTE Sentinel – Intelligent Approval & Compliance Automation
**Smart India Hackathon 2026 Prototype**  
**Team:** TEAM VALORA  

AICTE Sentinel is a next-generation regulatory intelligence and approval automation portal designed for technical institutions affiliated with the All India Council for Technical Education (AICTE), Ministry of Education, Government of India.

---

## 🏛️ Institution Portal Overview

The Institution Portal provides institutional heads (Directors, Principals, Registrars) with an enterprise dashboard to submit new program approvals, manage institutional compliance, monitor land lease tenures, resolve scrutiny deficiencies, and prepare for Expert Visit Committee (EVC) inspections.

### Key Design Theme
- **Primary Navy Blue:** `#123B70`
- **Secondary Blue:** `#2563EB`
- **Canvas Background:** `#F4F7FB`
- Government enterprise design system with white cards, subtle shadows, rounded corners, professional typography, and semantic status indicators (green, orange, red, and blue).

---

## 📂 Navigation & 14 Sidebar Options

The portal features 14 dedicated, independently routed pages organized into 5 intuitive sections:

### 1. OVERVIEW
- **Dashboard (`/institution/dashboard`):** Real-time statistics cards, My Pending Actions actionable links, upcoming deadline calendar, missing document alerts, compliance health score gauge, and recent officer remarks.

### 2. APPLICATION MANAGEMENT
- **New Application (`/institution/new-application`):** Multi-step submission form with validation across 5 steps, document checklist, file upload zone, Save Draft button, and direct addition to live state.
- **My Applications (`/institution/applications`):** Filterable, searchable data table displaying all submitted and active applications with full stage detail modals.
- **Application Tracking (`/institution/application-tracking`):** Deep 6-stage lifecycle timeline (Application Submitted, Initial Scrutiny, Deficiency Review, EVC Inspection, Committee Review, Final Decision) with SLA countdown indicators.
- **Deficiency & Clarifications (`/institution/deficiencies`):** Interactive scrutiny portal to view officer notices, upload supporting rectification files, enter clarification text, and submit responses.

### 3. DOCUMENTS & COMPLIANCE
- **Document Repository (`/institution/documents`):** Digital vault managing 8 statutory categories (Land, Building, Lease, Faculty, Infrastructure, Financial, Affidavits, and Others) with versioning, preview viewer, and simulated download.
- **Undertaking Compliance (`/institution/undertakings`):** Centralized tracker for mandatory council undertakings (Anti-ragging, 7th CPC salary adherence, capitation fee prohibition, PwD barrier-free environments) with evidence submission.
- **Lease & Document Validity (`/institution/lease-validity`):** Proactive expiration monitor with green (>90 days), orange (expiring soon), and red (expired) visual warnings, remaining day countdowns, and simulated 30-year renewal deed endorsement.
- **EVC & Inspection Status (`/institution/evc-inspection`):** Confidential surprise window alert, inspection panel details, interactive preparation checklist (toggles live state), and historical visit remarks.

### 4. COMMUNICATION
- **Notifications & Alerts (`/institution/notifications`):** Council bulletin centre supporting categorized alerts (deficiencies, deadlines, approvals, EVC windows), read/unread toggles, and direct action deep-links.
- **Help & Support (`/institution/help-support`):** Searchable Approval Process Handbook (APH) FAQs, procedural guides, and interactive helpdesk ticket submission form with live ticket tracker.

### 5. ACCOUNT
- **Institution Profile (`/institution/profile`):** Master institutional identity, AICTE Permanent ID, NAAC/NIRF credentials, Principal/Director data, and inline profile editing.
- **Settings (`/institution/settings`):** Session preferences, notification alert toggles, SMS emergency broadcast preferences, and password change controls.
- **Logout:** Accessible via sidebar and top navbar, triggering a confirmation dialog before clearing the session and redirecting to the sign-in screen.

---

## ⚡ Important Smart Features

1. **Obligation Clock:** Aggregates time-critical regulatory tasks (deficiencies, lease renewals, undertaking evidence) with countdown timers, task owners, and overdue visual alerts.
2. **Compliance Health Score:** Illustrative 100-point composite score with breakdown across Faculty Cadres, Land & Building, Laboratory Readiness, and Accreditation factors.
3. **Smart Alerts Banner:** Contextual alert ticker highlighting urgent scrutiny notices and expiring certificates with one-click resolution actions.
4. **Cryptographic Audit History:** Dedicated audit trail modal recording institution-side actions with timestamps, authorized user identities, and IP telemetry.

---

## 🚀 Running the Institution Portal Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Setup Instructions
1. Clone or open the repository folder:
   ```bash
   cd "AICTE SIH"
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   - **Institution Dashboard:** [http://localhost:5173/institution/dashboard](http://localhost:5173/institution/dashboard)
   - **Public Landing Page:** [http://localhost:5173/](http://localhost:5173/)
   - **Login Page:** [http://localhost:5173/login](http://localhost:5173/login) *(Click "Sign In" with any demo credentials to access the Institution Portal)*

5. Verify Production Build:
   ```bash
   npm run build
   ```

---

## 👥 Teammate Integration Notice
- The Institution Portal operates inside `src/portals/institution/`, `src/components/institution/`, `src/components/common/`, and `src/data/institutionMockData.js`.
- Public landing and authentication pages (`src/pages/LandingPage.jsx`, `src/pages/AuthPages.jsx`) are preserved and coordinated so Officer and Admin portals can be integrated without conflicting routes or overwritten files.
