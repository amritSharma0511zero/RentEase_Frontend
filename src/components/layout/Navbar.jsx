import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  Bell,
  LayoutDashboard,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    setIsProfileOpen(false);
    setIsMenuOpen(false);

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
            R
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Rent<span className="text-blue-600">Ease</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/properties"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            Properties
          </Link>

          {isAuthenticated && (
            <Link
              to="/favorites"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              <Heart className="h-4 w-4" />
              Favorites
            </Link>
          )}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-3 md:flex">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-blue-600"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setIsProfileOpen(
                      (prev) => !prev
                    )
                  }
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-slate-100"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    {user?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div className="hidden text-left lg:block">
                    <p className="max-w-[120px] truncate text-sm font-semibold text-slate-800">
                      {user?.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {user?.role}
                    </p>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition ${
                      isProfileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                    {/* User Info */}
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user?.name}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>

                    {/* Profile */}
                    <Link
                      to="/profile"
                      onClick={() =>
                        setIsProfileOpen(false)
                      }
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    {/* Owner Dashboard */}
                    {user?.role === "OWNER" && (
                      <Link
                        to="/owner"
                        onClick={() =>
                          setIsProfileOpen(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Owner Dashboard
                      </Link>
                    )}

                    {/* Admin Dashboard */}
                    {user?.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        onClick={() =>
                          setIsProfileOpen(false)
                        }
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    {/* Logout */}
                    <div className="border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() =>
            setIsMenuOpen((prev) => !prev)
          }
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">

          <div className="space-y-1 px-4 py-4">

            <Link
              to="/"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              to="/properties"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Properties
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/favorites"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Heart className="h-4 w-4" />
                  Favorites
                </Link>

                <Link
                  to="/notifications"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Bell className="h-4 w-4" />
                  Notifications
                </Link>

                <Link
                  to="/profile"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                {user?.role === "OWNER" && (
                  <Link
                    to="/owner"
                    onClick={() =>
                      setIsMenuOpen(false)
                    }
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Owner Dashboard
                  </Link>
                )}

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin"
                    onClick={() =>
                      setIsMenuOpen(false)
                    }
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">

                <Link
                  to="/login"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>

              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;