import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../components/ui";
import AuthLayout from "../../layouts/AuthLayout";
import { homeFor, useAuth } from "../../context/AuthContext";

export default function Verify() {
  const { user, code, sendCode, verify, logout } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (verify(input)) navigate(homeFor({ ...user, verified: true }), { replace: true });
    else setError("That code isn't right. Check it and try again, or send a new code.");
  };
  return (
    <AuthLayout title="Verify your account" subtitle={`Enter the 6-digit code we sent to ${user.email}.`}
      footer={<button type="button" onClick={logout} className="font-medium text-brand-700 underline">Use a different account</button>}>
      <Alert variant="info" title="Demo mode" className="mb-4">No email is sent yet. Your code is <strong>{code}</strong>.</Alert>
      <form onSubmit={submit} className="space-y-4">
        <Input label="Verification code" inputMode="numeric" maxLength={6} autoComplete="one-time-code" value={input}
          onChange={(e) => { setInput(e.target.value); setError(""); }} error={error} required />
        <Button type="submit" fullWidth size="lg">Verify account</Button>
        <Button variant="ghost" fullWidth onClick={() => { sendCode(); setInput(""); setError(""); }}>Send a new code</Button>
      </form>
    </AuthLayout>
  );
}
