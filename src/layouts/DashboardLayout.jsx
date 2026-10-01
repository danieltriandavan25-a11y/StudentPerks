import { Button, Card } from "../components/ui";
import { Squiggle } from "../components/illustrations";
import { useAuth } from "../context/AuthContext";
import { Brand } from "./PublicLayout";

export function Stat({ label, value, note }) {
  return (
    <Card padded>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-slate-900">{value}</p>
      {note && <p className="mt-1 text-sm text-slate-500">{note}</p>}
    </Card>
  );
}

export default function DashboardLayout({ role, title, subtitle, action, children }) {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand to="/" />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{user?.name} · {role}</span>
            <Button variant="secondary" size="sm" onClick={logout}>Sign out</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
            <Squiggle className="mt-1 w-28" />
            {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
