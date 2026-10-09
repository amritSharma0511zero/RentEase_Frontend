import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Ruler,
} from "lucide-react";

import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    _id,
    title,
    location,
    price,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    images,
  } = property;

  const image =
    images?.[0]?.url ||
    images?.[0] ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Property Type */}
        {propertyType && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-slate-700 shadow-sm">
            {propertyType}
          </span>
        )}

        {/* Favorite */}
        <button
          type="button"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm transition hover:bg-white hover:text-red-500"
          aria-label="Add to favorites"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
              {title}
            </h3>

            {location && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="h-4 w-4 shrink-0" />

                <span className="line-clamp-1">
                  {typeof location === "string"
                    ? location
                    : `${location.city || ""}${
                        location.state
                          ? `, ${location.state}`
                          : ""
                      }`}
                </span>
              </div>
            )}
          </div>

          {price !== undefined && (
            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-blue-600">
                ₹{Number(price).toLocaleString("en-IN")}
              </p>

              <p className="text-xs text-slate-400">
                / month
              </p>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm text-slate-500">
          {bedrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <BedDouble className="h-4 w-4" />
              <span>{bedrooms} Beds</span>
            </div>
          )}

          {bathrooms !== undefined && (
            <div className="flex items-center gap-1.5">
              <Bath className="h-4 w-4" />
              <span>{bathrooms} Baths</span>
            </div>
          )}

          {area !== undefined && (
            <div className="flex items-center gap-1.5">
              <Ruler className="h-4 w-4" />
              <span>{area} sq.ft</span>
            </div>
          )}
        </div>

        {/* View Details */}
        <Link
          to={`/properties/${_id}`}
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default PropertyCard;