import {
  Heart,
  Home,
  LogIn,
  Menu,
  User,
  X,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Home size={20} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Rent<span className="text-blue-600">
              Ease
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
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

          <Link
            to="/favorites"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <Heart size={17} />
            Favorites
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() =>
            setIsMenuOpen(!isMenuOpen)
          }
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              to="/properties"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Properties
            </Link>

            <Link
              to="/favorites"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <Heart size={17} />
              Favorites
            </Link>

            <div className="my-2 border-t border-slate-200" />

            <Link
              to="/login"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <LogIn size={17} />
              Login
            </Link>

            <Link
              to="/register"
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;