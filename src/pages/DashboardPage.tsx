import { useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import StatCard from "@/components/ui/StatCard";
import Select from "@/components/ui/Select";

type Period = {
  id: number;
  date_from: string;
  date_to: string;
  label: string | null;
};
type Movement = {
  id: number;
  period_id: number | null;
  kind_id: number;
  amount: number;
  description: string;
  movement_date: string;
};
type Extra = {
  id: number;
  period_id: number | null;
  amount: number;
  description: string;
  received_on: string;
};

const money = (n: number) => n.toLocaleString("es-CO");

export default function DashboardPage() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [periodId, setPeriodId] = useState<string>("");
  const [movs, setMovs] = useState<Movement[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);

  useEffect(() => {
    (async () => {
      const ps = await api<Period[]>(endpoints.periods.list);
      setPeriods(ps);
      if (ps[0]) setPeriodId(String(ps[0].id));
    })();
  }, []);

  useEffect(() => {
    if (!periodId) return;
    (async () => {
      const [m, e] = await Promise.all([
        api<Movement[]>(`${endpoints.movements.list}?period_id=${periodId}`),
        api<Extra[]>(`${endpoints.extras.list}?period_id=${periodId}`),
      ]);
      setMovs(m);
      setExtras(e);
    })();
  }, [periodId]);

  const stats = useMemo(() => {
    const extraTotal = extras.reduce((a, x) => a + Number(x.amount), 0);
    const gastos = movs
      .filter((x) => x.kind_id === 1)
      .reduce((a, x) => a + Number(x.amount), 0);
    const ahorros = movs
      .filter((x) => x.kind_id === 2)
      .reduce((a, x) => a + Number(x.amount), 0);
    const balance = extraTotal - gastos + ahorros;
    return { extraTotal, gastos, ahorros, balance };
  }, [movs, extras]);

  const periodOptions = [
    { value: "", label: "Selecciona periodo..." },
    ...periods.map((p) => ({
      value: String(p.id),
      label: p.label ?? `${p.date_from} → ${p.date_to}`,
    })),
  ];

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xl font-semibold">Dashboard</div>
          <div className="text-sm text-slate-300">Resumen por periodo</div>
        </div>

        <Select
          value={periodId}
          onChange={setPeriodId}
          options={periodOptions}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Extras" value={`$ ${money(stats.extraTotal)}`} />
        <StatCard title="Gastos" value={`$ ${money(stats.gastos)}`} />
        <StatCard title="Ahorros" value={`$ ${money(stats.ahorros)}`} />
        <StatCard title="Balance" value={`$ ${money(stats.balance)}`} />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 text-sm font-semibold">Últimos movimientos</div>
        <div className="grid gap-2">
          {movs.slice(0, 5).map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            >
              <div className="text-slate-200">
                <span className="text-slate-400">{m.movement_date}</span> —{" "}
                {m.description}
              </div>
              <div className="font-medium">$ {money(Number(m.amount))}</div>
            </div>
          ))}
          {!movs.length ? (
            <div className="text-sm text-slate-400">
              Sin movimientos en este periodo.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
