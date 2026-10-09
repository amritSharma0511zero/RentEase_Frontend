import { useEffect, useState } from "react";

import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import PropertyCard from "../../components/property/PropertyCard";
import { getProperties } from "../../services/propertyService";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page: 1,
        limit: 10,
      };

      if (filters.search.trim()) {
        params.search = filters.search.trim();
      }

      if (filters.propertyType) {
        params.propertyType = filters.propertyType;
      }

      if (filters.minPrice) {
        params.minPrice = filters.minPrice;
      }

      if (filters.maxPrice) {
        params.maxPrice = filters.maxPrice;
      }

      if (filters.sort) {
        params.sort = filters.sort;
      }

      const response = await getProperties(params);

      const propertyData =
        response?.data?.properties;

      setProperties(
        propertyData?.properties || []
      );
    } catch (err) {
      console.error(
        "Failed to fetch properties:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      sort: "",
    });

    setTimeout(() => {
      fetchProperties();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Properties
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find your next home
            </h1>

            <p className="mt-3 text-slate-500">
              Explore available properties and find a
              place that fits your lifestyle and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="grid gap-3 lg:grid-cols-6">

              {/* Search */}
              <div className="relative lg:col-span-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search location or property..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Property Type */}
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  All Types
                </option>

                <option value="apartment">
                  Apartment
                </option>

                <option value="house">
                  House
                </option>

                <option value="villa">
                  Villa
                </option>

                <option value="studio">
                  Studio
                </option>
              </select>

              {/* Min Price */}
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min price"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Max Price */}
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max price"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {/* Search button */}
              <button
                type="submit"
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Filter className="h-4 w-4" />
                Search
              </button>
            </div>

            {/* Bottom filters */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <SlidersHorizontal className="h-4 w-4" />
                Refine your search
              </div>

              <div className="flex items-center gap-3">

                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Sort By
                  </option>

                  <option value="price_asc">
                    Price: Low to High
                  </option>

                  <option value="price_desc">
                    Price: High to Low
                  </option>

                  <option value="newest">
                    Newest
                  </option>
                </select>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Properties */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Available Properties
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore properties available for rent.
            </p>
          </div>

          <div className="hidden items-center gap-1 text-sm text-slate-400 sm:flex">
            <ChevronDown className="h-4 w-4" />
            Updated listings
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading properties...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchProperties}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          properties.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No properties found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                There are currently no approved properties
                matching your search.
              </p>
            </div>
          )}

        {/* Property Grid */}
        {!loading &&
          !error &&
          properties.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                />
              ))}
            </div>
          )}
      </main>
    </div>
  );
};

export default Properties;