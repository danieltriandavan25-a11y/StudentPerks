import { Navigate } from "react-router-dom";
import { homeFor, useAuth } from "../context/AuthContext";

/** Only the matching, verified role may enter; everyone else goes to where they belong. */
export function RequireRole({ role, children }) {
  const { user } = useAuth();
  if (!user || !user.verified || user.role !== role) return <Navigate to={homeFor(user)} replace />;
  return children;
}

/** Login/register are for signed-out visitors only. */
export function GuestOnly({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to={homeFor(user)} replace /> : children;
}

/** Verification page: signed in but not yet verified. */
export function RequireUnverified({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.verified ? <Navigate to={homeFor(user)} replace /> : children;
}
