// import api from "./api";
import api from "./api";

export const checkServerHealth = async () => {
  const response = await api.get("/health");

  console.log("this is checkserverhealth", response);
  return response.data;
};