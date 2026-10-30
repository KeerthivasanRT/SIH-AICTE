import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { LoginPage, RegisterPage, ForgotPasswordPage } from './pages/AuthPages';

// Institution Portal Layout & Pages
import InstitutionLayout from './portals/institution/InstitutionLayout';
import Dashboard from './portals/institution/Dashboard';
import NewApplication from './portals/institution/NewApplication';
import MyApplications from './portals/institution/MyApplications';
import ApplicationTracking from './portals/institution/ApplicationTracking';
import DeficiencyClarifications from './portals/institution/DeficiencyClarifications';
import DocumentRepository from './portals/institution/DocumentRepository';
import UndertakingCompliance from './portals/institution/UndertakingCompliance';
import LeaseValidity from './portals/institution/LeaseValidity';
import EVCInspection from './portals/institution/EVCInspection';
import Notifications from './portals/institution/Notifications';
import HelpSupport from './portals/institution/HelpSupport';
import InstitutionProfile from './portals/institution/InstitutionProfile';
import Settings from './portals/institution/Settings';

function InstitutionPortal({ children }) {
  return <InstitutionLayout>{children}</InstitutionLayout>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Shared Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Institution Portal Routes (Organized by 5 Sidebar Groups) */}
        {/* Group 1: OVERVIEW */}
        <Route
          path="/institution/dashboard"
          element={
            <InstitutionPortal>
              <Dashboard />
            </InstitutionPortal>
          }
        />

        {/* Group 2: APPLICATION MANAGEMENT */}
        <Route
          path="/institution/new-application"
          element={
            <InstitutionPortal>
              <NewApplication />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/applications"
          element={
            <InstitutionPortal>
              <MyApplications />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/application-tracking"
          element={
            <InstitutionPortal>
              <ApplicationTracking />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/deficiencies"
          element={
            <InstitutionPortal>
              <DeficiencyClarifications />
            </InstitutionPortal>
          }
        />

        {/* Group 3: DOCUMENTS & COMPLIANCE */}
        <Route
          path="/institution/documents"
          element={
            <InstitutionPortal>
              <DocumentRepository />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/undertakings"
          element={
            <InstitutionPortal>
              <UndertakingCompliance />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/compliance"
          element={
            <InstitutionPortal>
              <UndertakingCompliance />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/lease-validity"
          element={
            <InstitutionPortal>
              <LeaseValidity />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/evc-inspection"
          element={
            <InstitutionPortal>
              <EVCInspection />
            </InstitutionPortal>
          }
        />

        {/* Group 4: COMMUNICATION */}
        <Route
          path="/institution/notifications"
          element={
            <InstitutionPortal>
              <Notifications />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/help-support"
          element={
            <InstitutionPortal>
              <HelpSupport />
            </InstitutionPortal>
          }
        />

        {/* Group 5: ACCOUNT */}
        <Route
          path="/institution/profile"
          element={
            <InstitutionPortal>
              <InstitutionProfile />
            </InstitutionPortal>
          }
        />
        <Route
          path="/institution/settings"
          element={
            <InstitutionPortal>
              <Settings />
            </InstitutionPortal>
          }
        />

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
