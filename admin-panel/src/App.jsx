 import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

import AdminLogin from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import GlobalSettings from "./pages/GlobalSettings";
import ContactsManager from "./pages/ContactsManager";
import CareersManager from "./pages/CareersManager";

/* ---------------- AUTH WRAPPER ---------------- */
function RequireAuth({ creds, children }) {
  if (!creds) return <Navigate to="/admin/login" replace />;
  return children;
}

/* ---------------- APP MAIN ---------------- */
export default function App() {
  const [creds, setCreds] = useState(() =>
    JSON.parse(sessionStorage.getItem("admin_creds") || "null")
  );

  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [isExpanded, setIsExpanded] = useState(false); // desktop hover expand

  function handleLogout() {
    sessionStorage.removeItem("admin_creds");
    setCreds(null);
    window.location.href = "/admin/login";
  }

  return (
    <BrowserRouter>
      <MainApp
        creds={creds}
        setCreds={setCreds}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        handleLogout={handleLogout}
      />
    </BrowserRouter>
  );
}

/* ---------------- LAYOUT HANDLED INSIDE APP ---------------- */
function MainApp({
  creds,
  setCreds,
  isOpen,
  setIsOpen,
  isExpanded,
  setIsExpanded,
  handleLogout,
}) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/admin/login";

  return (
    <>
      {/* Sidebar (hidden on login) */}
      {!isLoginPage && creds && (
        <AdminSidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      )}

      {/* Header (hidden on login) */}
      {!isLoginPage && creds && (
        <AdminHeader
          isOpen={isOpen}
          isExpanded={isExpanded}
          setIsOpen={setIsOpen}
          onLogout={handleLogout}
        />
      )}

      {/* CONTENT WRAPPER */}
      <div
        className={`
          min-h-screen bg-slate-50 px-6
          ${!isLoginPage && creds ? "pt-28 pb-6" : ""}
          ${
            !isLoginPage && creds
              ? isOpen
                ? "lg:ml-64"
                : isExpanded
                ? "lg:ml-64"
                : "lg:ml-20"
              : ""
          }
          transition-all duration-300
        `}
      >
        <Routes>
          {/* LOGIN PAGE */}
          <Route
            path="/admin/login"
            element={
              <AdminLogin
                onLogin={(c) => {
                  sessionStorage.setItem("admin_creds", JSON.stringify(c));
                  setCreds(c);
                }}
              />
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/admin"
            element={
              <RequireAuth creds={creds}>
                <AdminDashboard creds={creds} />
              </RequireAuth>
            }
          />

          {/* SETTINGS */}
          <Route
            path="/admin/settings"
            element={
              <RequireAuth creds={creds}>
                <GlobalSettings creds={creds} />
              </RequireAuth>
            }
          />

          {/* CONTACTS */}
          <Route
            path="/admin/contacts"
            element={
              <RequireAuth creds={creds}>
                <ContactsManager creds={creds} />
              </RequireAuth>
            }
          />

          {/* CAREERS */}
          <Route
            path="/admin/careers"
            element={
              <RequireAuth creds={creds}>
                <CareersManager creds={creds} />
              </RequireAuth>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </>
  );
}
