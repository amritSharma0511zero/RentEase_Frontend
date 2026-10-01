import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold text-white"
            >
              Rent<span className="text-blue-400">
                Ease
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
              Find your perfect place with RentEase.
              Discover properties, connect with
              owners, and make your next move easier.
            </p>

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-2.5 transition hover:bg-slate-800"
              >
                <FaFacebook size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-2.5 transition hover:bg-slate-800"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-2.5 transition hover:bg-slate-800"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="#"
                className="rounded-lg bg-slate-900 p-2.5 transition hover:bg-slate-800"
              >
                <FaGithub size={18} />
              </a>

            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white">
              Explore
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/properties"
                  className="transition hover:text-white"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  to="/favorites"
                  className="transition hover:text-white"
                >
                  Favorites
                </Link>
              </li>

            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-white">
              Account
            </h3>

            <ul className="mt-4 space-y-3 text-sm">

              <li>
                <Link
                  to="/login"
                  className="transition hover:text-white"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="transition hover:text-white"
                >
                  Create Account
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition hover:text-white"
                >
                  Profile
                </Link>
              </li>

            </ul>
          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} RentEase. All rights reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;