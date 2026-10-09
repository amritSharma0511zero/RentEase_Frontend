import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPin,
  Ruler,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import { getPropertyById } from "../../services/propertyService";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] =
    useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getPropertyById(id);

        console.log(
          "Property details response:",
          response
        );

        /*
          Backend response is expected to be:

          response.data.property
        */

        setProperty(
          response?.data?.property || null
        );
      } catch (err) {
        console.error(
          "Failed to fetch property:",
          err
        );

        setError(
          err?.response?.data?.message ||
            "Failed to load property details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading property...
          </p>

        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error || !property) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Building2 className="h-6 w-6 text-red-500" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-900">
            Property not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {error ||
              "This property may have been removed or is no longer available."}
          </p>

          <Link
            to="/properties"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>

        </div>
      </div>
    );
  }

  /* ================= DATA ================= */

  const images =
    property.images?.length > 0
      ? property.images
      : [
          {
            url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
          },
        ];

  const currentImage =
    images[selectedImage]?.url ||
    images[0]?.url;

  const formattedPrice = Number(
    property.price || 0
  ).toLocaleString("en-IN");

  const formattedDate = property.createdAt
    ? new Date(
        property.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= BACK ================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>

        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= IMAGE GALLERY ================= */}

        <section className="grid gap-3 lg:grid-cols-4">

          {/* Main Image */}
          <div className="relative h-[320px] overflow-hidden rounded-2xl bg-slate-200 sm:h-[450px] lg:col-span-3 lg:h-[520px]">

            <img
              src={currentImage}
              alt={property.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute left-5 top-5 flex gap-2">

              <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold capitalize text-slate-700 shadow-sm">
                {property.propertyType?.toLowerCase()}
              </span>

              <span className="rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                {property.listingType === "RENT"
                  ? "For Rent"
                  : "For Sale"}
              </span>

            </div>

          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">

            {images
              .slice(0, 4)
              .map((image, index) => (
                <button
                  key={
                    image.publicId ||
                    image.url ||
                    index
                  }
                  type="button"
                  onClick={() =>
                    setSelectedImage(index)
                  }
                  className={`relative h-24 overflow-hidden rounded-xl border-2 transition lg:h-auto ${
                    selectedImage === index
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${property.title} ${
                      index + 1
                    }`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}

          </div>

        </section>

        {/* ================= PROPERTY INFO ================= */}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Main Information */}
          <div className="lg:col-span-2">

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {property.title}
                  </h1>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 text-blue-600" />

                    <span>
                      {property.location?.address}
                      {property.location?.city
                        ? `, ${property.location.city}`
                        : ""}
                      {property.location?.state
                        ? `, ${property.location.state}`
                        : ""}
                      {property.location?.pincode
                        ? ` - ${property.location.pincode}`
                        : ""}
                    </span>
                  </div>

                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  aria-label="Add to favorites"
                >
                  <Heart className="h-5 w-5" />
                </button>

              </div>

              {/* Price */}
              <div className="mt-8 rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-blue-700">
                  {property.listingType ===
                  "RENT"
                    ? "Monthly Rent"
                    : "Sale Price"}
                </p>

                <div className="mt-1 flex items-end gap-2">

                  <span className="text-3xl font-bold text-blue-700">
                    ₹{formattedPrice}
                  </span>

                  {property.listingType ===
                    "RENT" && (
                    <span className="pb-1 text-sm text-blue-600">
                      / month
                    </span>
                  )}

                </div>

              </div>

              {/* Specifications */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                  <BedDouble className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 text-xs text-slate-400">
                    Bedrooms
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {property.bedrooms ?? 0}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                  <Bath className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 text-xs text-slate-400">
                    Bathrooms
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {property.bathrooms ?? 0}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                  <Ruler className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 text-xs text-slate-400">
                    Area
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {property.area} sq.ft
                  </p>

                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                  <Building2 className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 text-xs text-slate-400">
                    Type
                  </p>

                  <p className="mt-1 font-semibold capitalize text-slate-800">
                    {property.propertyType?.toLowerCase()}
                  </p>

                </div>

              </div>

              {/* Description */}
              <div className="mt-10 border-t border-slate-100 pt-8">

                <h2 className="text-xl font-bold text-slate-900">
                  About this property
                </h2>

                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {property.description}
                </p>

              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mt-10 border-t border-slate-100 pt-8">

                  <h2 className="text-xl font-bold text-slate-900">
                    Amenities
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">

                    {property.amenities.map(
                      (amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          {amenity}
                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-5">

            {/* Contact */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-bold text-slate-900">
                Interested in this property?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Connect with the owner to learn more
                or schedule a visit.
              </p>

              <div className="mt-5 space-y-3">

                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Contact Owner
                </button>

                <button
                  type="button"
                  className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Request a Visit
                </button>

              </div>

            </section>

            {/* Verification */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

              <div className="flex items-start gap-3">

                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                <div>

                  <h3 className="font-semibold text-emerald-800">
                    Verified Listing
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    This property has been reviewed
                    through the RentEase approval process.
                  </p>

                </div>

              </div>

            </section>

            {/* Date */}
            {formattedDate && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5">

                <div className="flex items-center gap-3 text-sm text-slate-500">

                  <CalendarDays className="h-4 w-4" />

                  <span>
                    Listed on {formattedDate}
                  </span>

                </div>

              </section>
            )}

          </aside>

        </div>

      </main>
    </div>
  );
};

export default PropertyDetails;