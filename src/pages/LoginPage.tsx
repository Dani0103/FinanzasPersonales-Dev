import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { setToken } from "../auth/auth";
import AuthCard from "../components/ui/AuthCard";
import TextField from "../components/ui/TextField";
import Alert from "../components/ui/Alert";
import { endpoints } from "../api/endpoints";

type LoginResponse = { userId: number; token: string };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { token } = await api<LoginResponse>(endpoints.auth.login, {
        method: "POST",
        body: { email, password },
        token: null,
      });
      setToken(token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Error iniciando sesión");
    }
  };

  return (
    <AuthCard
      title="Iniciar sesión"
      subtitle="Entra para gestionar tus finanzas."
    >
      <form onSubmit={onSubmit} className="grid gap-3">
        <TextField
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="correo@ejemplo.com"
          type="email"
          autoComplete="email"
        />
        <TextField
          label="Contraseña"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
        />

        {error ? <Alert text={error} /> : null}

        <button
          className="mt-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
          disabled={!email || !password}
          type="submit"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm hover:bg-slate-900"
        >
          Crear cuenta
        </button>
      </form>
    </AuthCard>
  );
}
