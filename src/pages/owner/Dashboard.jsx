import {
  Building2,
  CheckCircle2,
  Clock3,
  Plus,
  XCircle,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getMyProperties } from "../../services/propertyService";

const OwnerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyProperties();

      const propertyData = response?.data?.properties;

      const propertyList = Array.isArray(propertyData)
        ? propertyData
        : propertyData?.properties || [];

      setProperties(propertyList);
    } catch (error) {
      console.error(
        "Failed to fetch owner properties:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalProperties = properties.length;

  const approvedProperties = properties.filter(
    (property) => property.status === "APPROVED"
  ).length;

  const pendingProperties = properties.filter(
    (property) => property.status === "PENDING"
  ).length;

  const rejectedProperties = properties.filter(
    (property) => property.status === "REJECTED"
  ).length;

  const recentProperties = [...properties]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "REJECTED":
        return "bg-red-100 text-red-700";

      case "SOLD":
        return "bg-blue-100 text-blue-700";

      case "RENTED":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Owner Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your properties and track their status.
            </p>
          </div>

          <Link
            to="/owner/properties/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Total Properties
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalProperties}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Approved */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Approved
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {approvedProperties}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {pendingProperties}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Rejected
                </p>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  {rejectedProperties}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
          </div>

        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recent Properties */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recent Properties
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your latest property listings
                  </p>
                </div>

                <Link
                  to="/owner/properties"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {recentProperties.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <Building2 className="mx-auto h-10 w-10 text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-700">
                    No properties yet
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Add your first property to get started.
                  </p>

                  <Link
                    to="/owner/properties/create"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Property
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">

                  {recentProperties.map((property) => (
                    <div
                      key={property._id}
                      className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-4">

                        <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          <img
                            src={
                              property.images?.[0]?.url ||
                              property.images?.[0] ||
                              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80"
                            }
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-slate-900">
                            {property.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {property.location?.city || "Unknown city"}
                            {property.location?.state
                              ? `, ${property.location.state}`
                              : ""}
                          </p>

                          <p className="mt-1 text-sm font-semibold text-blue-600">
                            ₹
                            {Number(
                              property.price || 0
                            ).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            property.status
                          )}`}
                        >
                          {property.status}
                        </span>

                        <Link
                          to={`/properties/${property._id}`}
                          className="text-sm font-medium text-slate-600 hover:text-blue-600"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage your properties quickly
              </p>

              <div className="mt-5 space-y-3">

                <Link
                  to="/owner/properties/create"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Plus className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Add Property
                      </p>

                      <p className="text-xs text-slate-500">
                        Create a new listing
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  to="/owner/properties"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <Building2 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        My Properties
                      </p>

                      <p className="text-xs text-slate-500">
                        Manage your listings
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  to="/owner/requests"
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Requests
                      </p>

                      <p className="text-xs text-slate-500">
                        View visit requests
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;