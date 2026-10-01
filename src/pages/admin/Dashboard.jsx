import { useState } from "react";
import { Alert, Badge, Button, Card, CardBody, CardDescription, CardHeader, CardTitle, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui";
import DashboardLayout, { Stat } from "../../layouts/DashboardLayout";
import { claimStatus, getClaims, redeemClaim, useNow } from "../../context/claims";

const PENDING = [ // sample data
  ["Corner Bean Café", "Food & drink", "2 days ago"],
  ["Quick Print Hub", "Services", "3 days ago"],
];

export default function AdminDashboard() {
  const now = useNow();
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const claims = getClaims();
  const submit = (e) => {
    e.preventDefault();
    const r = redeemClaim(code);
    setResult(r.error ? { variant: "danger", text: r.error } : { variant: "success", text: `Confirmed: ${r.claim.offer} voucher ${r.claim.code}. Apply the discount.` });
    if (!r.error) setCode("");
  };
  return (
    <DashboardLayout role="Admin" title="Overview" subtitle="Confirm vouchers and review businesses.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Vouchers waiting" value={claims.filter((c) => claimStatus(c, now) === "active").length} />
        <Stat label="Vouchers confirmed" value={claims.filter((c) => c.redeemed).length} />
        <Stat label="Businesses awaiting review" value={PENDING.length} />
      </div>

      <Card>
        <CardHeader><CardTitle>Confirm a voucher</CardTitle><CardDescription>Students can't confirm their own vouchers. Enter the code they show you before it expires.</CardDescription></CardHeader>
        <CardBody>
          <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
            <Input label="Voucher code" placeholder="SP-XXXXXX" value={code} onChange={(e) => { setCode(e.target.value); setResult(null); }} wrapperClassName="max-w-xs" required />
            <Button type="submit">Confirm voucher</Button>
          </form>
          {result && <Alert variant={result.variant} className="mt-4">{result.text}</Alert>}
        </CardBody>
      </Card>

      <Table caption="Businesses awaiting review">
        <TableHead><TableRow><TableHeader>Business</TableHeader><TableHeader>Category</TableHeader><TableHeader>Submitted</TableHeader><TableHeader>Status</TableHeader><TableHeader align="right">Action</TableHeader></TableRow></TableHead>
        <TableBody>
          {PENDING.map(([n, c, t]) => (
            <TableRow key={n}><TableCell className="font-medium text-slate-900">{n}</TableCell><TableCell>{c}</TableCell><TableCell>{t}</TableCell>
              <TableCell><Badge variant="warning" dot>Pending</Badge></TableCell>
              <TableCell align="right"><Button size="sm" variant="secondary">Review</Button></TableCell></TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}
