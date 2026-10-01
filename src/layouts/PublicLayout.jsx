import { Link } from "react-router-dom";
import { Button } from "../components/ui";
import { Logo } from "../components/illustrations";
import { homeFor, useAuth } from "../context/AuthContext";

export function Brand({ to = "/" }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 font-display text-xl font-semibold text-slate-900">
      <Logo /> StudentPerks
    </Link>
  );
}

/**
 * Link into a role's portal. Signed-in users of another role see it disabled
 * (not a link at all), so a student can't open the business or admin area.
 */
export function PortalLink({ role, to, children, ...props }) {
  const { user } = useAuth();
  if (user && user.role !== role) {
    return (
      <Button as="span" role="link" disabled title={`Not available for ${user.role} accounts`} {...props}>
        {children}
      </Button>
    );
  }
  return <Button as={Link} to={user ? homeFor(user) : to} {...props}>{children}</Button>;
}

export default function PublicLayout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand />
          <nav className="flex items-center gap-2" aria-label="Account">
            {user ? (
              <>
                <Button as={Link} to={homeFor(user)} size="sm">{user.verified ? "My dashboard" : "Verify account"}</Button>
                <Button variant="ghost" size="sm" onClick={logout}>Sign out</Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="ghost" size="sm">Sign in</Button>
                <Button as={Link} to="/register" size="sm">Create account</Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6">
          <Brand />
          <nav className="flex gap-4" aria-label="Portals">
            <PortalLink role="business" to="/login" variant="ghost" size="sm">Business sign in</PortalLink>
            <PortalLink role="admin" to="/login" variant="ghost" size="sm">Admin sign in</PortalLink>
          </nav>
        </div>
      </footer>
    </div>
  );
}
