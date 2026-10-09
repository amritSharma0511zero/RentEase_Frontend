import {
  ImagePlus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { useRef, useState } from "react";

import {
  uploadPropertyImages,
  deletePropertyImage,
} from "../../services/propertyService";

const PropertyImageManager = ({
  property,
  onImagesUpdated,
}) => {
  const fileInputRef = useRef(null);

  const [selectedFiles, setSelectedFiles] =
    useState([]);

  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] = useState("");

  const images = property?.images || [];

  const handleFileChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    setError("");

    if (!files.length) {
      return;
    }

    setSelectedFiles(files);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles((previous) =>
      previous.filter(
        (_, fileIndex) => fileIndex !== index
      )
    );
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      return;
    }

    try {
      setUploading(true);
      setError("");

      const response =
        await uploadPropertyImages(
          property._id,
          selectedFiles
        );

      setSelectedFiles([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onImagesUpdated?.(response);

    } catch (error) {
      console.error(
        "Failed to upload images:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to upload images."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(imageId);
      setError("");

      const response =
        await deletePropertyImage(
          property._id,
          imageId
        );

      onImagesUpdated?.(response);

    } catch (error) {
      console.error(
        "Failed to delete image:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete image."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-10 border-t border-slate-100 pt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Property Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload clear images of your property.
          </p>
        </div>

        <span className="text-sm text-slate-500">
          {images.length} image
          {images.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Existing Images */}
      {images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div
              key={image._id || image.publicId}
              className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
            >
              <img
                src={image.url}
                alt="Property"
                className="h-full w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  handleDelete(
                    image._id || image.publicId
                  )
                }
                disabled={
                  deletingId ===
                  (image._id || image.publicId)
                }
                className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Delete image"
              >
                {deletingId ===
                (image._id || image.publicId) ? (
                  <span className="text-xs">
                    ...
                  </span>
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File Selection */}
      <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <ImagePlus className="h-6 w-6" />
          </div>

          <h3 className="mt-3 text-sm font-semibold text-slate-900">
            Add property images
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Select one or multiple images.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <Upload className="h-4 w-4" />
            Choose Images
          </button>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Selected Images
            </h3>

            <span className="text-xs text-slate-500">
              {selectedFiles.length} selected
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {selectedFiles.map(
              (file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                >
                  <p className="truncate pr-4 text-sm text-slate-700">
                    {file.name}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeSelectedFile(index)
                    }
                    className="shrink-0 text-slate-400 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload className="h-4 w-4" />

            {uploading
              ? "Uploading..."
              : "Upload Images"}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default PropertyImageManager;