import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import DesignSystem from "../pages/public/DesignSystem";

import StudentDashboard from "../pages/student/Dashboard";
import BusinessDashboard from "../pages/business/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import Verify from "../pages/public/Verify";
import { GuestOnly, RequireRole, RequireUnverified } from "./Guards";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />
      <Route path="/verify" element={<RequireUnverified><Verify /></RequireUnverified>} />

      <Route path="/student" element={<RequireRole role="student"><StudentDashboard /></RequireRole>} />
      <Route path="/business" element={<RequireRole role="business"><BusinessDashboard /></RequireRole>} />
      <Route path="/admin" element={<RequireRole role="admin"><AdminDashboard /></RequireRole>} />

      {/* Dev-only component preview. Not rendered in production builds. */}
      {import.meta.env.DEV && (
        <Route path="/design-system" element={<DesignSystem />} />
      )}
    </Routes>
  );
}

export default AppRoutes;
