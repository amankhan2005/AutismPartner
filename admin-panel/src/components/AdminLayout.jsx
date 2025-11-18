 import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);      // Mobile sidebar open
  const [isExpanded, setIsExpanded] = useState(false); // Desktop hover expand

  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <AdminHeader
        isOpen={isOpen}
        isExpanded={isExpanded}
        setIsOpen={setIsOpen}
      />

      {/* SIDEBAR */}
      <AdminSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />

      {/* MAIN CONTENT AREA */}
      <main
        className={`
          pt-24 px-4 sm:px-6 md:px-8
          transition-all duration-300
          ${
            isOpen
              ? "lg:ml-64"
              : isExpanded
              ? "lg:ml-64"
              : "lg:ml-20"
          }
        `}
      >
        {children}
      </main>
    </div>
  );
}
