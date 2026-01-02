import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/client";
import { setToken } from "@/auth/auth";
import AuthCard from "@/components/ui/AuthCard";
import TextField from "@/components/ui/TextField";
import Alert from "@/components/ui/Alert";
import { endpoints } from "@/api/endpoints";

type RegisterResponse = { userId: number; token: string };

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { token } = await api<RegisterResponse>(endpoints.auth.register, {
        method: "POST",
        body: {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
        token: null,
      });

      setToken(token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Error registrando usuario");
    }
  };

  return (
    <AuthCard title="Crear cuenta" subtitle="Regístrate para empezar.">
      <form onSubmit={onSubmit} className="grid gap-3">
        <TextField
          label="Nombres"
          value={firstName}
          onChange={setFirstName}
          placeholder="Tus nombres"
        />
        <TextField
          label="Apellidos"
          value={lastName}
          onChange={setLastName}
          placeholder="Tus apellidos"
        />

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
          autoComplete="new-password"
        />

        {error ? <Alert text={error} /> : null}

        <button
          className="mt-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
          disabled={!firstName || !lastName || !email || !password}
          type="submit"
        >
          Registrarme
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm hover:bg-slate-900"
        >
          Ya tengo cuenta
        </button>
      </form>
    </AuthCard>
  );
}
