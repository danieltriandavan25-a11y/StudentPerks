import { useState } from "react";
import { Alert, Badge, Button, Card, CardBody, CardDescription, CardHeader, CardTitle, EmptyState, Input, Modal, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, useToast } from "../../components/ui";
import { EmptyDoodle } from "../../components/illustrations";
import DashboardLayout, { Stat } from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { CLAIM_MINUTES, claimStatus, createClaim, fmtLeft, getClaims, useNow } from "../../context/claims";

const OFFERS = [ // sample data
  ["Corner Bean Café", "Food & drink", "15% off"],
  ["Page & Pen Books", "Books", "10% off"],
  ["Quick Print Hub", "Services", "20% off"],
];

export default function StudentDashboard() {
  const { user, code, sendCode, checkCode } = useAuth();
  const toast = useToast();
  const now = useNow();
  const [target, setTarget] = useState(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const claims = getClaims().filter((c) => c.email === user.email);
  const isActive = (offer) => claims.some((c) => c.offer === offer && claimStatus(c, now) === "active");

  const open = (offer) => { sendCode(); setInput(""); setError(""); setTarget(offer); };
  const confirm = () => {
    if (!checkCode(input)) return setError("That code isn't right. Check it and try again.");
    const c = createClaim(user.email, target);
    setTarget(null);
    toast.success(`Voucher ${c.code} claimed. Show it to staff within ${CLAIM_MINUTES} minutes.`);
  };

  return (
    <DashboardLayout role="Student" title="Your perks" subtitle="Offers from businesses near you.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Offers available" value={OFFERS.length} />
        <Stat label="Active vouchers" value={claims.filter((c) => claimStatus(c, now) === "active").length} />
        <Stat label="Vouchers used" value={claims.filter((c) => c.redeemed).length} />
      </div>

      <Card>
        <CardHeader><CardTitle>Your vouchers</CardTitle><CardDescription>A voucher is valid for {CLAIM_MINUTES} minutes after you claim it. Staff confirm it at the counter.</CardDescription></CardHeader>
        <CardBody>
          {claims.length === 0 ? (
            <EmptyState icon={<EmptyDoodle />} title="No vouchers yet" description="Claim an offer below to get a voucher code." />
          ) : (
            <ul className="divide-y divide-slate-200">
              {claims.map((c) => {
                const st = claimStatus(c, now);
                return (
                  <li key={c.code} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div><p className="font-medium text-slate-900">{c.offer}</p><p className="font-mono text-lg tracking-wider text-slate-800">{c.code}</p></div>
                    <div className="flex items-center gap-3">
                      {st === "active" && <span className="text-sm text-slate-600">{fmtLeft(c.expiresAt - now)} left</span>}
                      <Badge variant={st === "active" ? "info" : st === "redeemed" ? "success" : "neutral"} dot>{st === "active" ? "Active" : st === "redeemed" ? "Used" : "Expired"}</Badge>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardBody>
      </Card>

      <Table caption="Nearby offers">
        <TableHead><TableRow><TableHeader>Business</TableHeader><TableHeader>Category</TableHeader><TableHeader>Discount</TableHeader><TableHeader align="right">Action</TableHeader></TableRow></TableHead>
        <TableBody>
          {OFFERS.map(([n, c, d]) => (
            <TableRow key={n}><TableCell className="font-medium text-slate-900">{n}</TableCell><TableCell>{c}</TableCell><TableCell>{d}</TableCell>
              <TableCell align="right"><Button size="sm" disabled={isActive(n)} onClick={() => open(n)}>{isActive(n) ? "Claimed" : "Claim"}</Button></TableCell></TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={!!target} onClose={() => setTarget(null)} title={`Claim ${target ?? ""} offer`}
        description={`Confirm it's you. The voucher will be valid for ${CLAIM_MINUTES} minutes.`}
        footer={<><Button variant="secondary" onClick={() => setTarget(null)}>Cancel</Button><Button onClick={confirm}>Claim voucher</Button></>}>
        <Alert variant="info" title="Demo mode" className="mb-4">No email is sent yet. Your code is <strong>{code}</strong>.</Alert>
        <Input label="Verification code" inputMode="numeric" maxLength={6} value={input} error={error}
          onChange={(e) => { setInput(e.target.value); setError(""); }} />
      </Modal>
    </DashboardLayout>
  );
}
