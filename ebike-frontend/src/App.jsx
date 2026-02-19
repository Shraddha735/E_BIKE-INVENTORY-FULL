import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StaffDashboard from "./pages/StaffDashboard";

import Bikes from "./pages/Bikes";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import StockHistory from "./pages/StockHistory";

import ProtectedRoute from "./components/common/ProtectedRoute";

import AdminLayout from "./components/layout/AdminLayout";
import StaffLayout from "./components/layout/StaffLayout";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bikes"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Bikes />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Customers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/suppliers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Suppliers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/purchases"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Purchases />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <Reports />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/stock-history"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout>
              <StockHistory />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= STAFF ROUTES ================= */}

      <Route
        path="/staff-dashboard"
        element={
          <ProtectedRoute allowedRoles={["STAFF"]}>
            <StaffLayout>
              <StaffDashboard />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/sales"
  element={
    <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
      {localStorage.getItem("role") === "ADMIN" ? (
        <AdminLayout>
          <Sales />
        </AdminLayout>
      ) : (
        <StaffLayout>
          <Sales />
        </StaffLayout>
      )}
    </ProtectedRoute>
  }
/>


      <Route
        path="/staff-customers"
        element={
          <ProtectedRoute allowedRoles={["STAFF"]}>
            <StaffLayout>
              <Customers />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff-bikes"
        element={
          <ProtectedRoute allowedRoles={["STAFF"]}>
            <StaffLayout>
              <Bikes />
            </StaffLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;