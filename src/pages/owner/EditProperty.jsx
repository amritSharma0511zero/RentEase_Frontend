import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import PropertyImageManager from "../../components/property/PropertyImageManager";

import {
  getPropertyById,
  updateProperty,
} from "../../services/propertyService";

const EditProperty = () => {
  const { id } = useParams();
  console.log("this is id", id);
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "APARTMENT",
    listingType: "RENT",
    price: "",
    bedrooms: 0,
    bathrooms: 0,
    area: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  console.log("this is formdata", formData);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPropertyById(id);

      const propertyData = response?.data?.property;

      if (!propertyData) {
        throw new Error("Property not found.");
      }

      // Store complete property
      // including images
      setProperty(propertyData);

      setFormData({
        title: propertyData.title || "",
        description: propertyData.description || "",
        propertyType:
          propertyData.propertyType || "APARTMENT",
        listingType:
          propertyData.listingType || "RENT",
        price: propertyData.price || "",
        bedrooms: propertyData.bedrooms ?? 0,
        bathrooms: propertyData.bathrooms ?? 0,
        area: propertyData.area || "",
        address:
          propertyData.location?.address || "",
        city:
          propertyData.location?.city || "",
        state:
          propertyData.location?.state || "",
        pincode:
          propertyData.location?.pincode || "",
      });
    } catch (error) {
      console.error(
        "Failed to fetch property:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load property."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const propertyData = {
        title: formData.title,
        description: formData.description,
        propertyType: formData.propertyType,
        listingType: formData.listingType,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),

        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      await updateProperty(id, propertyData);

      // Refresh property data
      // so image manager also has latest data
      await fetchProperty();

      setSuccess(
        "Property updated successfully."
      );

      setTimeout(() => {
        navigate("/owner/properties");
      }, 1000);
    } catch (error) {
      console.error(
        "Failed to update property:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to update property."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleImagesUpdated = async () => {
    try {
      setError("");

      await fetchProperty();
    } catch (error) {
      console.error(
        "Failed to refresh property images:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading property...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/owner/properties"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Properties
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update your property information.
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Basic Information
            </h2>

            <div className="mt-5 grid gap-5">

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
                  required
                  minLength={5}
                  maxLength={150}
                  placeholder="Enter property title"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  required
                  minLength={20}
                  maxLength={5000}
                  rows={5}
                  placeholder="Describe your property"
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Property Type + Listing Type */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Property Type
                  </label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="APARTMENT">
                      Apartment
                    </option>

                    <option value="HOUSE">
                      House
                    </option>

                    <option value="VILLA">
                      Villa
                    </option>

                    <option value="PG">
                      PG
                    </option>

                    <option value="OFFICE">
                      Office
                    </option>

                    <option value="SHOP">
                      Shop
                    </option>

                    <option value="LAND">
                      Land
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Listing Type
                  </label>

                  <select
                    name="listingType"
                    value={formData.listingType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="RENT">
                      Rent
                    </option>

                    <option value="SALE">
                      Sale
                    </option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Pricing & Property Details
            </h2>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="₹ Price"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bedrooms
                </label>

                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bathrooms
                </label>

                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  min="0"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Area (sq.ft)
                </label>

                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="1200"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>
          </div>

          {/* Location */}
          <div className="mt-10 border-t border-slate-100 pt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Location
            </h2>

            <div className="mt-5 grid gap-5">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter full address"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Property Images */}
          {property && (
            <PropertyImageManager
              property={property}
              onImagesUpdated={handleImagesUpdated}
            />
          )}

          {/* Submit */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

            <Link
              to="/owner/properties"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />

              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;