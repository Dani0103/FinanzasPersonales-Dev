import { useEffect, useState } from "react";
import { api } from "../api/client";
import { endpoints } from "../api/endpoints";
import Alert from "../components/ui/Alert";
import MovementForm from "../modules/movements/MovementForm";
import MovementsFilters from "../modules/movements/MovementsFilters";
import MovementsTable from "../modules/movements/MovementsTable";
import type {
  Account,
  Period,
  Movement,
} from "../modules/movements/movements.types";

export default function MovementsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [periods, setPeriods] = useState<Period[]>([]);
  const [items, setItems] = useState<Movement[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    period: "",
    account: "",
    kind: "",
    status: "",
  });

  const loadBase = async () => {
    setError(null);
    const [acc, per] = await Promise.all([
      api<Account[]>(endpoints.accounts.list),
      api<Period[]>(endpoints.periods.list),
    ]);
    setAccounts(acc);
    setPeriods(per);
    if (per[0] && !filters.period)
      setFilters((f) => ({ ...f, period: String(per[0].id) }));
  };

  const loadMovements = async () => {
    setError(null);
    const qs = new URLSearchParams();
    if (filters.period) qs.set("period_id", filters.period);
    if (filters.account) qs.set("account_id", filters.account);
    if (filters.kind) qs.set("kind_id", filters.kind);
    if (filters.status) qs.set("status_id", filters.status);

    const url = qs.toString()
      ? `${endpoints.movements.list}?${qs.toString()}`
      : endpoints.movements.list;

    setItems(await api<Movement[]>(url));
  };

  useEffect(() => {
    loadBase().catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadMovements().catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.period, filters.account, filters.kind, filters.status]);

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-xl font-semibold">Movimientos</div>
        <div className="text-sm text-slate-300">
          Registra gastos/ahorros y filtra por estado.
        </div>
      </div>

      <MovementForm
        accounts={accounts}
        periods={periods}
        onCreated={loadMovements}
        onError={setError}
      />

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-2 text-sm font-semibold">Filtros</div>
        <MovementsFilters
          periods={periods}
          accounts={accounts}
          value={filters}
          onChange={setFilters}
        />
      </div>

      {error ? <Alert text={error} /> : null}

      <MovementsTable items={items} accounts={accounts} />
    </div>
  );
}
