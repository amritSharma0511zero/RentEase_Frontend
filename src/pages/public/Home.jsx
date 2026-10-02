import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Home as HomeIcon,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Background decoration */}
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Find a place you'll love to live
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Find Your
              <span className="text-blue-400"> Perfect Home</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Discover verified properties, explore great locations, and find a
              home that fits your lifestyle and budget.
            </p>

            {/* Search Box */}
            <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-white p-2 shadow-2xl">
              <div className="flex flex-col gap-2 md:flex-row">
                {/* Location */}
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                  <MapPin className="h-5 w-5 shrink-0 text-blue-600" />

                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-slate-400">
                      Location
                    </p>

                    <input
                      type="text"
                      placeholder="Search city or area"
                      className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 md:w-48">
                  <Building2 className="h-5 w-5 shrink-0 text-blue-600" />

                  <div className="flex-1 text-left">
                    <p className="text-xs font-medium text-slate-400">
                      Property Type
                    </p>

                    <select
                      className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select type
                      </option>

                      <option value="apartment">Apartment</option>

                      <option value="house">House</option>

                      <option value="villa">Villa</option>

                      <option value="studio">Studio</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <Link
                  to="/properties"
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 md:px-7"
                >
                  <Search className="h-4 w-4" />
                  Search
                </Link>
              </div>
            </div>

            {/* Quick stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Verified listings
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                Trusted platform
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-400" />
                Easy property search
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROPERTY TYPES ================= */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Find a property that fits you
              </h2>

              <p className="mt-3 max-w-2xl text-slate-500">
                Explore different property types and discover spaces designed
                for every lifestyle.
              </p>
            </div>

            <Link
              to="/properties"
              className="hidden items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:flex"
            >
              View all properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Apartment */}
            <Link
              to="/properties?type=apartment"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Apartments
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Modern apartments for comfortable city living.
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* House */}
            <Link
              to="/properties?type=house"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <HomeIcon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Houses
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Spacious homes perfect for families and groups.
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Villa */}
            <Link
              to="/properties?type=villa"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Building2 className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Villas
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Premium villas with extra space and privacy.
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Studio */}
            <Link
              to="/properties?type=studio"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <HomeIcon className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Studios
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Compact and affordable spaces for modern living.
              </p>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600">
                Explore
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY RENTEASE ================= */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why RentEase
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              A simpler way to find your next home
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need to discover, compare, and connect with
              property owners.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Verified Properties
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Browse property listings reviewed through our platform's
                approval process.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Search className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Easy Search
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Search properties by location, type, price, and other
                preferences.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">
                Connect With Owners
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Connect with property owners and make your rental search easier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find your next home?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Explore available properties and discover a place that feels right
              for you.
            </p>

            <Link
              to="/properties"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Explore Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
