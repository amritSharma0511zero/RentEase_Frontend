import { useState } from "react";
import { ArrowLeft, Building2, Home, IndianRupee, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { createProperty } from "../../services/propertyService";

const CreateProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    listingType: "RENT",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),

        propertyType: formData.propertyType,
        listingType: formData.listingType,

        price: Number(formData.price),

        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),

        location: {
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
        },
      };

      await createProperty(payload);

      setSuccess(
        "Property created successfully. It is now waiting for admin approval.",
      );

      setTimeout(() => {
        navigate("/owner/properties");
      }, 1500);
    } catch (err) {
      console.error("Create property error:", err);

      setError(err?.response?.data?.message || "Failed to create property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/owner"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Owner
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Add New Property
            </h1>

            <p className="mt-2 text-slate-500">
              Add your property details and submit it for admin approval.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Basic Information
                </h2>

                <p className="text-sm text-slate-500">
                  Tell us about your property.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Property Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern 2 BHK Apartment"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your property..."
                  rows={5}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Type */}
              <div>
                {/* <label className="mb-2 block text-sm font-medium text-slate-700">
                  Property Type
                </label> */}

                {/* <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select property type</option>

                  <option value="apartment">Apartment</option>

                  <option value="house">House</option>

                  <option value="villa">Villa</option>

                  <option value="studio">Studio</option>
                </select> */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Property Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Property Type
                    </label>

                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select property type</option>

                      <option value="APARTMENT">Apartment</option>

                      <option value="HOUSE">House</option>

                      <option value="VILLA">Villa</option>

                      <option value="PG">PG</option>

                      <option value="OFFICE">Office</option>

                      <option value="SHOP">Shop</option>

                      <option value="LAND">Land</option>
                    </select>
                  </div>

                  {/* Listing Type */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Listing Type
                    </label>

                    <select
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleChange}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="RENT">For Rent</option>

                      <option value="SALE">For Sale</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Property Details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Home className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Property Details
                </h2>

                <p className="text-sm text-slate-500">
                  Add pricing and property specifications.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Price */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Monthly Rent
                </label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25000"
                    min="0"
                    required
                    className="h-11 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bedrooms
                </label>

                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="2"
                  min="0"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Bathrooms */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bathrooms
                </label>

                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
                  min="0"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Area */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Area (sq.ft)
                </label>

                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="1200"
                  min="0"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">Location</h2>

                <p className="text-sm text-slate-500">
                  Where is your property located?
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Address */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Delhi"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* State */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          {/* Messages */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {success}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/owner/properties"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-blue-600 px-7 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Property"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateProperty;
