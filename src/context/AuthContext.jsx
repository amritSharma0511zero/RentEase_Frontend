import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const response = await refreshAccessToken();

      const token = response?.data?.accessToken;

      if (!token) {
        setLoading(false);
        return;
      }

      setAccessToken(token);

      sessionStorage.setItem("accessToken", token);

      const userResponse = await getCurrentUser();

      const currentUser = userResponse?.data?.user;

      setUser(currentUser || null);
    } catch (error) {
      console.log(
        "No active session:",
        error.response?.data?.message || error.message,
      );

      setUser(null);
      setAccessToken(null);

      sessionStorage.removeItem("accessToken");
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userData) => {
    setAccessToken(token);
    setUser(userData);

    sessionStorage.setItem("accessToken", token);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);

      sessionStorage.removeItem("accessToken");
    }
  };

  const value = {
    user,
    accessToken,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
