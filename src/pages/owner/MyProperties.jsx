import { useEffect, useState } from "react";

import {
  Building2,
  Edit,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  deleteProperty,
  getMyProperties,
} from "../../services/propertyService";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyProperties();

      console.log(
        "My properties response:",
        response
      );

      const propertyData =
        response?.data?.properties;

      setProperties(
        Array.isArray(propertyData)
          ? propertyData
          : propertyData?.properties || []
      );
    } catch (err) {
      console.error(
        "Failed to fetch my properties:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load your properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteProperty(id);

      setProperties((previous) =>
        previous.filter(
          (property) => property._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Delete property error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to delete property."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "PENDING":
        return "bg-amber-50 text-amber-700";

      case "SOLD":
        return "bg-purple-50 text-purple-700";

      case "RENTED":
        return "bg-blue-50 text-blue-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const formatStatus = (status) => {
    if (!status) {
      return "Unknown";
    }

    return (
      status.charAt(0) +
      status.slice(1).toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Owner
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                My Properties
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your property listings and track
                their approval status.
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
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">

              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Loading your properties...
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
              onClick={fetchMyProperties}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
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
                <Building2 className="h-6 w-6 text-slate-400" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                No properties yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                You haven't added any properties yet.
                Create your first listing to get started.
              </p>

              <Link
                to="/owner/properties/create"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Your First Property
              </Link>

            </div>
          )}

        {/* Property Grid */}
        {!loading &&
          !error &&
          properties.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {properties.map((property) => {
                const image =
                  property.images?.[0]?.url ||
                  property.images?.[0] ||
                  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

                return (
                  <article
                    key={property._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  >

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden bg-slate-100">

                      <img
                        src={image}
                        alt={property.title}
                        className="h-full w-full object-cover"
                      />

                      <span
                        className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          property.status
                        )}`}
                      >
                        {formatStatus(
                          property.status
                        )}
                      </span>

                    </div>

                    {/* Content */}
                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h2 className="truncate text-lg font-semibold text-slate-900">
                            {property.title}
                          </h2>

                          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                            <MapPin className="h-4 w-4 shrink-0" />

                            <span className="truncate">
                              {property.location?.city}
                              {property.location?.state
                                ? `, ${property.location.state}`
                                : ""}
                            </span>
                          </div>

                        </div>

                        <p className="shrink-0 text-lg font-bold text-blue-600">
                          ₹
                          {Number(
                            property.price || 0
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      {/* Meta */}
                      <div className="mt-4 flex flex-wrap gap-2">

                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
                          {property.propertyType?.toLowerCase()}
                        </span>

                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {property.listingType === "RENT"
                            ? "For Rent"
                            : "For Sale"}
                        </span>

                        {property.bedrooms !==
                          undefined && (
                          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {property.bedrooms} Beds
                          </span>
                        )}

                      </div>

                      {/* Actions */}
                      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">

                        <Link
                          to={`/owner/properties/${property._id}/edit`}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              property._id
                            )
                          }
                          disabled={
                            deletingId ===
                            property._id
                          }
                          className="flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label="Delete property"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                      </div>

                    </div>
                  </article>
                );
              })}

            </div>
          )}

      </main>
    </div>
  );
};

export default MyProperties;