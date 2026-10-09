import { useEffect, useState } from "react";

import {
  CheckCircle2,
  Eye,
  MapPin,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  approveProperty,
  getAdminProperties,
  rejectProperty,
} from "../../services/propertyService";

const Approvals = () => {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [processingId, setProcessingId] =
    useState(null);

  const [rejectingId, setRejectingId] =
    useState(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminProperties({
          status: "PENDING",
          page: 1,
          limit: 20,
        });

      console.log(
        "Admin properties response:",
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
        "Failed to fetch pending properties:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to load pending properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const handleApprove = async (id) => {
    try {
      setProcessingId(id);

      await approveProperty(id);

      setProperties((previous) =>
        previous.filter(
          (property) => property._id !== id
        )
      );
    } catch (err) {
      console.error(
        "Approve property error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to approve property."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (id) => {
    setRejectingId(id);
    setRejectionReason("");
  };

  const closeRejectModal = () => {
    setRejectingId(null);
    setRejectionReason("");
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      return;
    }

    try {
      setProcessingId(rejectingId);

      await rejectProperty(
        rejectingId,
        rejectionReason.trim()
      );

      setProperties((previous) =>
        previous.filter(
          (property) =>
            property._id !== rejectingId
        )
      );

      closeRejectModal();
    } catch (err) {
      console.error(
        "Reject property error:",
        err
      );

      alert(
        err?.response?.data?.message ||
          "Failed to reject property."
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Property Approvals
          </h1>

          <p className="mt-2 text-slate-500">
            Review properties submitted by owners and
            approve or reject them.
          </p>

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
                Loading pending properties...
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
              onClick={fetchPendingProperties}
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

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-7 w-7 text-emerald-500" />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-900">
                No pending properties
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                There are currently no properties waiting
                for approval.
              </p>

            </div>
          )}

        {/* Properties */}
        {!loading &&
          !error &&
          properties.length > 0 && (
            <div className="space-y-5">

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

                    <div className="flex flex-col lg:flex-row">

                      {/* Image */}
                      <div className="h-64 lg:h-auto lg:w-80 lg:shrink-0">

                        <img
                          src={image}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />

                      </div>

                      {/* Details */}
                      <div className="flex-1 p-6">

                        <div className="flex flex-col gap-5">

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                            <div>

                              <div className="flex flex-wrap items-center gap-2">

                                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                                  Pending
                                </span>

                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                                  {property.propertyType?.toLowerCase()}
                                </span>

                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                  {property.listingType ===
                                  "RENT"
                                    ? "For Rent"
                                    : "For Sale"}
                                </span>

                              </div>

                              <h2 className="mt-3 text-xl font-bold text-slate-900">
                                {property.title}
                              </h2>

                              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">

                                <MapPin className="h-4 w-4" />

                                <span>
                                  {property.location?.city}
                                  {property.location?.state
                                    ? `, ${property.location.state}`
                                    : ""}
                                </span>

                              </div>

                            </div>

                            <div className="sm:text-right">

                              <p className="text-xl font-bold text-blue-600">
                                ₹
                                {Number(
                                  property.price || 0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                              {property.listingType ===
                                "RENT" && (
                                <p className="text-xs text-slate-400">
                                  per month
                                </p>
                              )}

                            </div>

                          </div>

                          <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                            {property.description}
                          </p>

                          {/* Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-slate-500">

                            <span>
                              {property.bedrooms || 0}{" "}
                              Bedrooms
                            </span>

                            <span>
                              {property.bathrooms || 0}{" "}
                              Bathrooms
                            </span>

                            <span>
                              {property.area} sq.ft
                            </span>

                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                            <Link
                              to={`/properties/${property._id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                              <Eye className="h-4 w-4" />
                              View Property
                            </Link>

                            <div className="flex gap-3">

                              <button
                                type="button"
                                onClick={() =>
                                  handleApprove(
                                    property._id
                                  )
                                }
                                disabled={
                                  processingId ===
                                  property._id
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <CheckCircle2 className="h-4 w-4" />

                                {processingId ===
                                property._id
                                  ? "Processing..."
                                  : "Approve"}
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  openRejectModal(
                                    property._id
                                  )
                                }
                                disabled={
                                  processingId ===
                                  property._id
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

      </main>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="text-xl font-bold text-slate-900">
              Reject Property
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please provide a reason for rejecting this
              property.
            </p>

            <textarea
              value={rejectionReason}
              onChange={(event) =>
                setRejectionReason(
                  event.target.value
                )
              }
              placeholder="Enter rejection reason..."
              rows={4}
              className="mt-5 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <div className="mt-5 flex justify-end gap-3">

              <button
                type="button"
                onClick={closeRejectModal}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReject}
                disabled={
                  !rejectionReason.trim() ||
                  processingId === rejectingId
                }
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {processingId === rejectingId
                  ? "Rejecting..."
                  : "Reject Property"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Approvals;