import { useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import StatCard from "@/components/ui/StatCard";
import Select from "@/components/ui/Select";
import BudgetTable from "@/components/dashboard/BudgetTable";

type Period = {
  id: number;
  date_from: string;
  date_to: string;
  label: string | null;
};

type Movement = {
  id: number;
  kind_id: number;
  amount: number;
  description: string;
  movement_date: string;
};

type Extra = {
  id: number;
  amount: number;
};

type Payroll = {
  summary: {
    total_income: number;
    total_deductions: number;
    net: number;
  };
};

const money = (n: number) => n.toLocaleString("es-CO");

export default function DashboardPage() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [periodId, setPeriodId] = useState<string>("");

  const [movs, setMovs] = useState<Movement[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);

  const [payroll, setPayroll] = useState<Payroll | null>(null); // 👈 NEW

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
      const [m, e, p] = await Promise.all([
        api<Movement[]>(`${endpoints.movements.list}?period_id=${periodId}`),
        api<Extra[]>(`${endpoints.extras.list}?period_id=${periodId}`),
        api<Payroll>(`${endpoints.payroll.get}?period_id=${periodId}`), // 👈 NEW
      ]);

      setMovs(m);
      setExtras(e);
      setPayroll(p); // 👈 NEW
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

    const salary = payroll?.summary.total_income ?? 0; // 👈 NEW
    const deductions = payroll?.summary.total_deductions ?? 0; // 👈 NEW

    const balance = extraTotal - gastos - ahorros + (salary - deductions);

    console.log("🚀 ~ DashboardPage ~ movs:", movs);
    const rows = movs.map((m) => ({
      pago: "Pagado",
      tipo: m.kind_id === 1 ? "Gasto" : m.kind_id == 2 ? "Ahorro" : "Otro",
      observacion: m.description,
      gasto: Number(m.amount),
    }));

    const expenses = rows.reduce((a, r) => a + r.gasto, 0);

    const income = payroll?.summary.total_income ?? 0;
    const incomePlusExtras =
      income + extras.reduce((a, x) => a + Number(x.amount), 0);

    const free = incomePlusExtras - expenses;

    const weekly = Math.round(free / 4);

    return {
      extraTotal,
      gastos,
      ahorros,
      balance,
      salary,
      deductions,
      rows,
      expenses,
      income,
      incomePlusExtras,
      free,
      weekly,
    };
  }, [movs, extras, payroll]);

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

      <div className="grid gap-3 lg:grid-cols-4">
        {/* SALARIO — ocupa 2 columnas */}
        <div className="lg:col-span-2">
          <StatCard
            title="Salario"
            value={`$ ${money(stats.salary)}`}
            color="blue"
          />
        </div>

        {/* BALANCE — ocupa 2 columnas */}
        <div className="lg:col-span-2">
          <StatCard
            title="Balance"
            value={`$ ${money(stats.balance)}`}
            color="green"
          />
        </div>

        {/* FILA INFERIOR */}
        <StatCard
          title="Deducciones"
          value={`$ ${money(stats.deductions)}`}
          color="red"
        />

        <StatCard
          title="Extras"
          value={`$ ${money(stats.extraTotal)}`}
          color="yellow"
        />

        <StatCard
          title="Gastos"
          value={`$ ${money(stats.gastos)}`}
          color="red"
        />

        <StatCard
          title="Ahorros"
          value={`$ ${money(stats.ahorros)}`}
          color="green"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BudgetTable
            rows={stats.rows}
            income={stats.income}
            expenses={stats.expenses}
            free={stats.free}
            weekly={stats.weekly}
          />
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
    </div>
  );
}
