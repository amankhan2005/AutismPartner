 import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

import AdminLogin from "./pages/Login";
import AdminDashboard from "./pages/Dashboard";
import GlobalSettings from "./pages/GlobalSettings";
import SliderManager from "./pages/SliderManager";
import ContactsManager from "./pages/ContactsManager";
import CareersManager from "./pages/CareersManager";

/* ---------------------- AUTH WRAPPER ---------------------- */
function RequireAuth({ creds, children }) {
  if (!creds) return <Navigate to="/admin/login" replace />;
  return children;
}

/* ---------------------- APP MAIN ---------------------- */
export default function App() {
  const [creds, setCreds] = useState(() =>
    JSON.parse(sessionStorage.getItem("admin_creds") || "null")
  );

  const [isExpanded, setIsExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem("admin_creds");
    setCreds(null);
    window.location.href = "/admin/login";
  }

  return (
    <MainApp
      creds={creds}
      setCreds={setCreds}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleLogout={handleLogout}
    />
  );
}

/* ---------------------- SEPARATE LAYOUT HANDLER ---------------------- */
function MainApp({
  creds,
  setCreds,
  isExpanded,
  setIsExpanded,
  isOpen,
  setIsOpen,
  handleLogout
}) {
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin/login";

  return (
    <>
      {!isLoginPage && creds && (
        <AdminSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {!isLoginPage && creds && (
        <AdminHeader isExpanded={isExpanded} onLogout={handleLogout} />
      )}

      {!isLoginPage && creds && <AdminFooter isExpanded={isExpanded} />}

      <div
        className={`
          min-h-screen bg-slate-50 px-6
          ${!isLoginPage && creds ? "pt-16 pb-12" : ""}
          ${!isLoginPage && creds ? (isExpanded ? "lg:ml-64" : "lg:ml-20") : ""}
          transition-all duration-300
        `}
      >
        <Routes>
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

          <Route
            path="/admin"
            element={
              <RequireAuth creds={creds}>
                <AdminDashboard creds={creds} />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <RequireAuth creds={creds}>
                <GlobalSettings creds={creds} />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/slider"
            element={
              <RequireAuth creds={creds}>
                <SliderManager creds={creds} />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/contacts"
            element={
              <RequireAuth creds={creds}>
                <ContactsManager creds={creds} />
              </RequireAuth>
            }
          />

          <Route
            path="/admin/careers"
            element={
              <RequireAuth creds={creds}>
                <CareersManager creds={creds} />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </>
  );
}
