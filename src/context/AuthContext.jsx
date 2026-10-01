import { createContext, useContext, useState } from "react";

const read = (k, f) => { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch { return f; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

// Demo accounts (no backend yet). Admin accounts can't be self-registered.
const SEED = [
  { email: "admin@studentperks.test", password: "admin123", name: "Admin", role: "admin", verified: true },
  { email: "cafe@studentperks.test", password: "business123", name: "Corner Bean Café", role: "business", verified: true },
];

const Ctx = createContext(null);
export const homeFor = (u) => (!u ? "/login" : !u.verified ? "/verify" : `/${u.role}`);
const newCode = () => String(100000 + Math.floor(Math.random() * 900000));

export function AuthProvider({ children }) {
  const [email, setEmail] = useState(() => read("sp_session", null));
  const [code, setCode] = useState(() => read("sp_code", null));
  const [, bump] = useState(0);
  const all = () => [...SEED, ...read("sp_users", [])];
  const user = email ? all().find((u) => u.email === email) ?? null : null;

  const sendCode = () => { const c = newCode(); write("sp_code", c); setCode(c); };
  const startSession = (u) => { write("sp_session", u.email); setEmail(u.email); if (!u.verified) sendCode(); };

  const register = ({ name, email: e, password, role }) => {
    e = e.trim().toLowerCase();
    if (all().some((u) => u.email === e)) return { error: "An account with this email already exists." };
    const u = { name, email: e, password, role, verified: false };
    write("sp_users", [...read("sp_users", []), u]);
    startSession(u);
    return { user: u };
  };
  const login = (e, password) => {
    const u = all().find((x) => x.email === e.trim().toLowerCase() && x.password === password);
    if (!u) return { error: "Email or password is incorrect." };
    startSession(u);
    return { user: u };
  };
  const checkCode = (input) => !!code && input.trim() === code;
  const verify = (input) => {
    if (!checkCode(input)) return false;
    write("sp_users", read("sp_users", []).map((u) => (u.email === email ? { ...u, verified: true } : u)));
    bump((n) => n + 1);
    return true;
  };
  const logout = () => { localStorage.removeItem("sp_session"); setEmail(null); };

  return (
    <Ctx.Provider value={{ user, code, sendCode, checkCode, register, login, verify, logout }}>
      {children}
    </Ctx.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(Ctx);
