import api from "./api";

export const getProperties = async (params = {}) => {
  const response = await api.get("/properties", {
    params,
  });

  return response.data;
};

export const getPropertyById = async (id) => {
  const response = await api.get(`/properties/${id}`);

  return response.data;
};

export const createProperty = async (propertyData) => {
  const response = await api.post(
    "/properties",
    propertyData
  );

  return response.data;
};

export const getMyProperties = async () => {
  const response = await api.get(
    "/properties/owner/my-properties"
  );

  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(
    `/properties/${id}`
  );

  return response.data;
};

export const getAdminProperties = async (params = {}) => {
  const response = await api.get(
    "/admin/properties",
    {
      params,
    }
  );

  return response.data;
};

export const getAdminPropertyById = async (id) => {
  const response = await api.get(
    `/admin/properties/${id}`
  );

  return response.data;
};

export const approveProperty = async (id) => {
  const response = await api.patch(
    `/admin/properties/${id}/approve`
  );

  return response.data;
};

export const rejectProperty = async (
  id,
  rejectionReason
) => {
  const response = await api.patch(
    `/admin/properties/${id}/reject`,
    {
      rejectionReason,
    }
  );

  return response.data;
};

export const updateProperty = async (id, propertyData) => {
  const response = await api.put(
    `/properties/${id}`,
    propertyData
  );

  return response.data;
};

export const uploadPropertyImages = async (
  id,
  files
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post(
    `/properties/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deletePropertyImage = async (
  propertyId,
  imageId
) => {
  const response = await api.delete(
    `/properties/${propertyId}/images/${imageId}`
  );

  return response.data;
};

export const replacePropertyImage = async (
  propertyId,
  imageId,
  file
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.put(
    `/properties/${propertyId}/images/${imageId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};