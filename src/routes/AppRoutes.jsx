import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

// Public pages
import Home from "../pages/public/Home";
import Properties from "../pages/public/Properties";
import PropertyDetails from "../pages/public/PropertyDetails";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// User pages
import Favorites from "../pages/user/Favorites";
import Notifications from "../pages/user/Notifications";
import Profile from "../pages/user/Profile";
import VisitRequests from "../pages/user/VisitRequests";

// Owner pages
import OwnerDashboard from "../pages/owner/Dashboard";
import MyProperties from "../pages/owner/MyProperties";
import CreateProperty from "../pages/owner/CreateProperty";
import EditProperty from "../pages/owner/EditProperty";
import OwnerRequests from "../pages/owner/Requests";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminProperties from "../pages/admin/Properties";
import AdminApprovals from "../pages/admin/Approvals";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          {/* ==================== */}
          {/* PUBLIC ROUTES */}
          {/* ==================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ==================== */}
          {/* AUTHENTICATED ROUTES */}
          {/* ==================== */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/favorites"
              element={<Favorites />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/visit-requests"
              element={<VisitRequests />}
            />


            {/* ==================== */}
            {/* OWNER ROUTES */}
            {/* ==================== */}

            <Route element={<RoleBasedRoute allowedRoles={["OWNER"]} />}>

              <Route
                path="/owner"
                element={<OwnerDashboard />}
              />

              <Route
                path="/owner/properties"
                element={<MyProperties />}
              />

              <Route
                path="/owner/properties/create"
                element={<CreateProperty />}
              />

              <Route
                path="/owner/properties/:id/edit"
                element={<EditProperty />}
              />

              <Route
                path="/owner/requests"
                element={<OwnerRequests />}
              />

            </Route>


            {/* ==================== */}
            {/* ADMIN ROUTES */}
            {/* ==================== */}

            <Route element={<RoleBasedRoute allowedRoles={["ADMIN"]} />}>

              <Route
                path="/admin"
                element={<AdminDashboard />}
              />

              <Route
                path="/admin/users"
                element={<AdminUsers />}
              />

              <Route
                path="/admin/properties"
                element={<AdminProperties />}
              />

              <Route
                path="/admin/approvals"
                element={<AdminApprovals />}
              />

            </Route>

          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;