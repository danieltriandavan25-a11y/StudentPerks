import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Input, Select } from "../../components/ui";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const { register } = useAuth();
  const [error, setError] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const r = register({ ...f, role });
    if (r.error) setError(r.error); else navigate("/verify", { replace: true });
  };
  return (
    <AuthLayout
      title="Create your account"
      subtitle="It takes about a minute."
      footer={<>Already registered? <Link to="/login" className="font-medium text-brand-700 underline">Sign in</Link></>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && <Alert variant="danger">{error}</Alert>}
        <Select label="I am a" value={role} onChange={(e) => setRole(e.target.value)}
          options={[{ value: "student", label: "Student" }, { value: "business", label: "Business owner" }]} />
        <Input name="name" label={role === "student" ? "Full name" : "Business name"} required />
        <Input name="email" label="Email" type="email" autoComplete="email" required />
        <Input name="password" label="Password" type="password" autoComplete="new-password" hint="At least 8 characters" minLength={8} required />
        <Button type="submit" fullWidth size="lg">Create account</Button>
      </form>
    </AuthLayout>
  );
}
