import { useEffect, useState } from "react";
import { api } from "../api/client";

type Account = {
  id: number;
  name: string;
  account_type: string;
  currency: string;
  opening_balance: number;
  is_active: number;
};

const money = (n: number) => n.toLocaleString("es-CO");

export default function AccountsPage() {
  const [items, setItems] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    setItems(await api<Account[]>("/api/accounts"));
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  const create = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await api<{ id: number }>("/api/accounts", {
        method: "POST",
        body: { name },
      });
      setName("");
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-xl font-semibold">Cuentas</div>
        <div className="text-sm text-slate-300">
          Tus cuentas personales (Nequi, Bancos, etc.)
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex flex-wrap gap-2">
          <input
            className="flex-1 min-w-[220px] rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500"
            placeholder="Nombre cuenta (Nequi, Bancolombia...)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={create}
            disabled={loading || !name.trim()}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Creando..." : "Crear"}
          </button>
        </div>

        {error ? (
          <div className="mt-3 rounded-lg border border-rose-900/60 bg-rose-950/40 px-3 py-2 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 text-sm font-semibold">Listado</div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-300">
              <tr className="border-b border-slate-800">
                <th className="py-2 text-left font-medium">Nombre</th>
                <th className="py-2 text-left font-medium">Tipo</th>
                <th className="py-2 text-left font-medium">Moneda</th>
                <th className="py-2 text-right font-medium">Saldo inicial</th>
                <th className="py-2 text-center font-medium">Activa</th>
              </tr>
            </thead>

            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-b border-slate-800/60">
                  <td className="py-2">
                    <div className="font-medium text-slate-100">{a.name}</div>
                    <div className="text-xs text-slate-400">ID #{a.id}</div>
                  </td>
                  <td className="py-2 text-slate-200">{a.account_type}</td>
                  <td className="py-2 text-slate-200">{a.currency}</td>
                  <td className="py-2 text-right text-slate-200">
                    $ {money(Number(a.opening_balance))}
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs ${
                        a.is_active
                          ? "bg-emerald-950/40 text-emerald-200 border border-emerald-900/50"
                          : "bg-slate-950 text-slate-400 border border-slate-800"
                      }`}
                    >
                      {a.is_active ? "Sí" : "No"}
                    </span>
                  </td>
                </tr>
              ))}

              {!items.length ? (
                <tr>
                  <td className="py-6 text-center text-slate-400" colSpan={5}>
                    Aún no tienes cuentas. Crea la primera arriba.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
