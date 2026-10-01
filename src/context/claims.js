import { useEffect, useState } from "react";

const K = "sp_claims";
export const CLAIM_MINUTES = 15;
export const getClaims = () => { try { return JSON.parse(localStorage.getItem(K)) ?? []; } catch { return []; } };
const save = (c) => localStorage.setItem(K, JSON.stringify(c));

export function createClaim(email, offer) {
  const c = { code: "SP-" + Math.random().toString(36).slice(2, 8).toUpperCase(), email, offer, expiresAt: Date.now() + CLAIM_MINUTES * 60000, redeemed: false };
  save([c, ...getClaims()]);
  return c;
}

/** Called by an admin account, never by the student who claimed it. */
export function redeemClaim(code) {
  const all = getClaims();
  const c = all.find((x) => x.code === code.trim().toUpperCase());
  if (!c) return { error: "Voucher code not found." };
  if (c.redeemed) return { error: "This voucher has already been used." };
  if (Date.now() > c.expiresAt) return { error: "This voucher has expired. The student needs to claim it again." };
  c.redeemed = true;
  save(all);
  return { claim: c };
}

export const claimStatus = (c, now) => (c.redeemed ? "redeemed" : now > c.expiresAt ? "expired" : "active");
export const fmtLeft = (ms) => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

export function useNow() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  return now;
}
