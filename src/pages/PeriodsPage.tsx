import { useEffect, useState } from "react";
import { api } from "../api/client";

type Period = {
  id: number;
  date_from: string;
  date_to: string;
  label: string | null;
  created_at?: string;
};

export default function PeriodsPage() {
  const [items, setItems] = useState<Period[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    setItems(await api<Period[]>("/api/periods"));
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  const create = async () => {
    if (!dateFrom || !dateTo) return;
    setLoading(true);
    setError(null);
    try {
      await api<{ id: number }>("/api/periods", {
        method: "POST",
        body: { date_from: dateFrom, date_to: dateTo, label: label || null },
      });
      setDateFrom("");
      setDateTo("");
      setLabel("");
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
        <div className="text-xl font-semibold">Periodos</div>
        <div className="text-sm text-slate-300">
          Crea periodos (quincena/mes) para filtrar movimientos y extras.
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="grid gap-1">
            <label className="text-xs text-slate-300">Desde</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs text-slate-300">Hasta</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid gap-1">
            <label className="text-xs text-slate-300">
              Etiqueta (opcional)
            </label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Diciembre 2025"
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={create}
            disabled={loading || !dateFrom || !dateTo}
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
                <th className="py-2 text-left font-medium">Etiqueta</th>
                <th className="py-2 text-left font-medium">Desde</th>
                <th className="py-2 text-left font-medium">Hasta</th>
                <th className="py-2 text-right font-medium">ID</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/60">
                  <td className="py-2">
                    <div className="font-medium text-slate-100">
                      {p.label ?? "Sin etiqueta"}
                    </div>
                    <div className="text-xs text-slate-400">
                      {p.date_from} → {p.date_to}
                    </div>
                  </td>
                  <td className="py-2 text-slate-200">{p.date_from}</td>
                  <td className="py-2 text-slate-200">{p.date_to}</td>
                  <td className="py-2 text-right text-slate-200">#{p.id}</td>
                </tr>
              ))}

              {!items.length ? (
                <tr>
                  <td className="py-6 text-center text-slate-400" colSpan={4}>
                    Aún no tienes periodos. Crea el primero arriba.
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
