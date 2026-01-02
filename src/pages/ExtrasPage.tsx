import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import Alert from "@/components/ui/Alert";
import ExtraForm from "@/modules/extras/ExtraForm";
import ExtrasFilters from "@/modules/extras/ExtrasFilters";
import ExtrasTable from "@/modules/extras/ExtrasTable";
import type { Extra, Period } from "@/modules/extras/extras.types";

export default function ExtrasPage() {
  const [periods, setPeriods] = useState<Period[]>([]);
  const [items, setItems] = useState<Extra[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = useState("");

  const loadBase = async () => {
    setError(null);
    const ps = await api<Period[]>(endpoints.periods.list);
    setPeriods(ps);
    if (ps[0] && !filterPeriod) setFilterPeriod(String(ps[0].id));
  };

  const loadExtras = async () => {
    setError(null);
    const url = filterPeriod
      ? `${endpoints.extras.list}?period_id=${filterPeriod}`
      : endpoints.extras.list;
    setItems(await api<Extra[]>(url));
  };

  useEffect(() => {
    loadBase().catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadExtras().catch((e) => setError(e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPeriod]);

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-xl font-semibold">Extras</div>
        <div className="text-sm text-slate-300">
          Ingresos adicionales (trabajos, ventas, etc.)
        </div>
      </div>

      <ExtraForm periods={periods} onCreated={loadExtras} onError={setError} />

      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-2 text-sm font-semibold">Filtros</div>
        <ExtrasFilters
          periods={periods}
          value={filterPeriod}
          onChange={setFilterPeriod}
        />
      </div>

      {error ? <Alert text={error} /> : null}

      <ExtrasTable items={items} />
    </div>
  );
}
