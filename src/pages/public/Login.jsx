import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input } from "../../components/ui";
import { homeFor, useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const r = login(f.get("email"), f.get("password"));
    if (r.error) setError(r.error); else navigate(homeFor(r.user), { replace: true });
  };
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to see your offers."
      footer={<>New here? <Link to="/register" className="font-medium text-brand-700 underline">Create an account</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <Input label="Email" name="email" type="email" autoComplete="email" required />
        <Input label="Password" name="password" type="password" autoComplete="current-password" required />
        <Button type="submit" fullWidth size="lg">Sign in</Button>
      </form>
    </AuthLayout>
  );
}
