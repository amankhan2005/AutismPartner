 import React, { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaSignOutAlt, FaBell, FaSearch } from "react-icons/fa";

// Constants for better maintainability
const ANIMATION_DURATION = 300;
const LOGOUT_DELAY = 1500;

export default function AdminHeader({ isOpen, isExpanded, setIsOpen, onLogout, user }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dontAsk, setDontAsk] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Refs for DOM manipulation
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
        setShowMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Focus management for modal
  useEffect(() => {
    if (showModal && modalRef.current) {
      modalRef.current.focus();
    }
  }, [showModal]);

  // Memoized logout function
  const startLogout = useCallback(() => {
    setShowModal(false);
    setLoading(true);

    setTimeout(() => {
      if (onLogout) onLogout();
      setLoading(false);
    }, LOGOUT_DELAY);
  }, [onLogout]);

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    if (dontAsk) startLogout();
    else setShowModal(true);
  }, [dontAsk, startLogout]);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or implement search functionality
      navigate(`/admin/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }, [searchQuery, navigate]);

  // Sample notifications (in a real app, these would come from props or API)
  const notifications = [
    { id: 1, message: "New contact form submission", read: false },
    { id: 2, message: "System update available", read: false },
    { id: 3, message: "Weekly report is ready", read: true }
  ];

  return (
    <header
      className={`
        fixed top-0 right-0 h-20 md:h-24 w-full z-[900]
        bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500
        shadow-xl flex items-center justify-between text-white
        px-4 sm:px-6 md:px-8 transition-all duration-300
        ${isOpen ? "lg:left-64" : isExpanded ? "lg:left-64" : "lg:left-20"}
      `}
    >
      {/* Mobile sidebar button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2.5 bg-white/20 border border-white/30 rounded-xl shadow-md hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Open sidebar"
      >
        <FaBars className="text-xl text-white" />
      </button>

      {/* Branding */}
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl tracking-wide">
          Autism ABA Partner
        </h1>
       </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="hidden md:flex items-center bg-white/20 rounded-xl px-3 py-2 border border-white/30 backdrop-blur-md">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-white placeholder-orange-100 outline-none w-48 lg:w-64"
        />
        <button type="submit" className="ml-2 text-white hover:text-orange-200 transition-colors" aria-label="Search">
          <FaSearch />
        </button>
      </form>

      {/* RIGHT SIDE ACTIONS */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <FaBell className="text-xl" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm font-semibold">
                Notifications
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`px-4 py-3 border-b border-gray-100 text-gray-700 text-sm ${!notification.read ? 'bg-blue-50' : ''}`}>
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">No new notifications</div>
                )}
              </div>
              <div className="px-4 py-2 bg-gray-50 text-center">
                <button className="text-blue-600 text-sm hover:underline">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl border border-white/30 backdrop-blur-md hover:bg-white/30 transition focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-semibold">Logout</span>
        </button>

        {/* PROFILE BUTTON */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 text-white hover:bg-white/20 rounded-full p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-haspopup="true"
            aria-expanded={showMenu}
          >
            <FaUserCircle className="h-9 w-9" />
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm">
                <div className="font-semibold">{user?.name || "Admin User"}</div>
                <div className="text-gray-500">{user?.email || "admin@example.com"}</div>
              </div>

              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm transition-colors">
                Profile Settings
              </button>

              {/* MOBILE LOGOUT */}
              <button
                onClick={handleLogout}
                className="w-full flex md:hidden items-center space-x-2 text-red-600 font-medium hover:bg-red-50 px-4 py-2 text-sm transition-colors"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-[999]">
          <div className="h-full bg-orange-600 animate-[progress_1.5s_linear_forwards]" />
        </div>
      )}

      {/* Logout modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[999]"
          onClick={() => setShowModal(false)}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            tabIndex="-1"
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>

            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="dontAsk"
                checked={dontAsk}
                onChange={() => setDontAsk(!dontAsk)}
                className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="dontAsk" className="text-sm text-gray-600">
                Don't ask me again
              </label>
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={startLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity:1; transform:scale(1);} }
        .animate-fadeIn { animation: fadeIn .25s ease-out; }
      `}</style>
    </header>
  );
}