import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import Alert from "@/components/ui/Alert";
import type {
  DeductionRule,
  DeductionType,
} from "@/modules/payroll/deductions.types";
import DeductionRuleForm from "@/modules/payroll/DeductionRuleForm";
import DeductionRulesTable from "@/modules/payroll/DeductionRulesTable";

export default function DeductionRulesPanel({
  onChanged,
}: {
  onChanged: () => void; // recarga /api/payroll
}) {
  const [types, setTypes] = useState<DeductionType[]>([]);
  const [rules, setRules] = useState<DeductionRule[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    const [t, r] = await Promise.all([
      api<DeductionType[]>(endpoints.deductions.types),
      api<DeductionRule[]>(endpoints.deductions.rules),
    ]);
    setTypes(t);
    setRules(r);
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  const afterChange = async () => {
    await load();
    await onChanged(); // ✅ refresca descuentos del payroll
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 grid gap-3">
      <div>
        <div className="text-sm font-semibold">Reglas de descuentos</div>
        <div className="text-xs text-slate-400">
          Crea reglas por valor fijo (AMOUNT) o porcentaje (PERCENT).
        </div>
      </div>

      {types.length ? (
        <DeductionRuleForm
          types={types}
          onCreated={afterChange}
          onError={setError}
        />
      ) : (
        <div className="text-sm text-slate-400">
          No hay tipos de deducción (deduction_types) creados.
        </div>
      )}

      {error ? <Alert text={error} /> : null}

      <DeductionRulesTable
        items={rules}
        onDeleted={afterChange}
        onError={setError}
      />
    </div>
  );
}
