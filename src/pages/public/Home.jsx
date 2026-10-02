import { useEffect, useState } from "react";

import { checkServerHealth } from "../../services/healthService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const Home = () => {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [error, setError] = useState("");

  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const testConnection = async () => {
      try {
        const data = await checkServerHealth();

        console.log("this is data", data);
        setApiStatus(data.message);
      } catch (error) {
        console.error("API connection error:", error);

        setApiStatus("Backend connection failed");
        setError(error.message);
      }
    };

    testConnection();
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
          RentEase
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Find Your Perfect Place
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Discover properties, connect with owners,
          and find a place that feels like home.
        </p>

        <div className="mx-auto mt-8 max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Backend Status
          </p>

          <p
            className={`mt-2 font-semibold ${
              error
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {apiStatus}
          </p>

          {error && (
            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>

      </div>
    </section>
  );
};

export default Home;