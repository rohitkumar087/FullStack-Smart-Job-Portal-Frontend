import React, { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Menu,
  X,
  LogOut,
  UserRound,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("userName");

    setIsLoggedIn(!!token);
    setRole(storedRole || "");
    setUserName(storedName || "User");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const getDashboardPath = () => {
    if (role === "ADMIN") return "/adminDashboard";
    if (role === "RECRUITER") return "/recruiterDashboard";
    if (role === "CANDIDATE") return "/candidateDashboard";
    return "/";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    setShowLogoutModal(false);
    setMenuOpen(false);

    navigate("/login");
  };

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link
            to={isLoggedIn ? getDashboardPath() : "/"}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-sm">
              <BriefcaseBusiness size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-950 dark:text-white leading-none">
                SmartJob
              </h1>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Portal
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {!isLoggedIn && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
              </>
            )}

            {isLoggedIn && role === "CANDIDATE" && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/jobs">Jobs</NavLink>
                <NavLink to="/candidateDashboard">Dashboard</NavLink>
                <NavLink to="/candidateProfile">Profile</NavLink>
                <NavLink to="/myApplications">My Applications</NavLink>
              </>
            )}

            {isLoggedIn && role === "RECRUITER" && (
              <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/recruiterDashboard">Dashboard</NavLink>
                <NavLink to="/postJob">Post Job</NavLink>
                <NavLink to="/myPostedJobs">My Jobs</NavLink>
                <NavLink to="/applicationManagement">Applications</NavLink>
                <NavLink to="/companyProfile">My Company Details</NavLink>
              </>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <>
                <NavLink to="/adminDashboard">Dashboard</NavLink>
                <NavLink to="/admin/users">Users</NavLink>
                <NavLink to="/admin/recruiters">Recruiters</NavLink>
                <NavLink to="/admin/recruiters/pending">Pending</NavLink>
                <NavLink to="/admin/jobs">Jobs</NavLink>
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition"
              title="Toggle theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {role === "ADMIN" ? (
                      <ShieldCheck size={19} />
                    ) : (
                      <UserRound size={19} />
                    )}
                  </div>

                  <div className="leading-tight">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {userName}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-11 h-11 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-950 transition"
                  title="Logout"
                >
                  <LogOut size={21} />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden pb-5 space-y-3">
            {!isLoggedIn && (
              <>
                <MobileLink to="/" setMenuOpen={setMenuOpen}>
                  Home
                </MobileLink>
                <MobileLink to="/jobs" setMenuOpen={setMenuOpen}>
                  Jobs
                </MobileLink>
              </>
            )}

            {isLoggedIn && role === "CANDIDATE" && (
              <>
                <MobileLink to="/" setMenuOpen={setMenuOpen}>
                  Home
                </MobileLink>
                <MobileLink to="/jobs" setMenuOpen={setMenuOpen}>
                  Jobs
                </MobileLink>
                <MobileLink to="/candidateDashboard" setMenuOpen={setMenuOpen}>
                  Candidate Dashboard
                </MobileLink>
                <MobileLink to="/candidateProfile" setMenuOpen={setMenuOpen}>
                  Candidate Profile
                </MobileLink>
                <MobileLink to="/myApplications" setMenuOpen={setMenuOpen}>
                  My Applications
                </MobileLink>
              </>
            )}

            {isLoggedIn && role === "RECRUITER" && (
              <>
                <MobileLink to="/" setMenuOpen={setMenuOpen}>
                  Home
                </MobileLink>
                <MobileLink to="/recruiterDashboard" setMenuOpen={setMenuOpen}>
                  Recruiter Dashboard
                </MobileLink>
                <MobileLink to="/postJob" setMenuOpen={setMenuOpen}>
                  Post Job
                </MobileLink>
                <MobileLink to="/myPostedJobs" setMenuOpen={setMenuOpen}>
                  My Posted Jobs
                </MobileLink>
                <MobileLink to="/applicationManagement" setMenuOpen={setMenuOpen}>
                  Applications
                </MobileLink>
                <MobileLink to="/companyProfile" setMenuOpen={setMenuOpen}>
                  My Company Details
                </MobileLink>
              </>
            )}

            {isLoggedIn && role === "ADMIN" && (
              <>
                <MobileLink to="/adminDashboard" setMenuOpen={setMenuOpen}>
                  Dashboard
                </MobileLink>
                <MobileLink to="/admin/users" setMenuOpen={setMenuOpen}>
                  Users
                </MobileLink>
                <MobileLink to="/admin/recruiters" setMenuOpen={setMenuOpen}>
                  Recruiters
                </MobileLink>
                <MobileLink to="/admin/recruiters/pending" setMenuOpen={setMenuOpen}>
                  Pending Recruiters
                </MobileLink>
                <MobileLink to="/admin/jobs" setMenuOpen={setMenuOpen}>
                  Jobs
                </MobileLink>
              </>
            )}

            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200"
            >
              Theme
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {!isLoggedIn ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-center px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-slate-800 border border-blue-100 dark:border-slate-700">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    {role === "ADMIN" ? (
                      <ShieldCheck size={20} />
                    ) : (
                      <UserRound size={20} />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {userName}
                    </p>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm font-bold"
                >
                  <LogOut size={19} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setShowLogoutModal(false)}
          />

          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-2xl p-6 sm:p-7">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center mx-auto mb-5">
              <LogOut size={32} className="text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-2xl font-extrabold text-center text-slate-950 dark:text-white">
              Are you sure?
            </h2>

            <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              You will be logged out from your account. You need to login again
              to access your dashboard.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="px-5 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
    >
      {children}
    </Link>
  );
};

const MobileLink = ({ to, children, setMenuOpen }) => {
  return (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className="block px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200"
    >
      {children}
    </Link>
  );
};

export default Navbar;
