import { useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import TextField from "@/components/ui/TextField";
import type { PayrollResp } from "@/modules/payroll/payroll.types";

export default function PayrollForm({
  initial,
  onSaved,
  onError,
}: {
  initial: PayrollResp["profile"];
  onSaved: (r: PayrollResp) => void;
  onError: (msg: string | null) => void;
}) {
  const [base, setBase] = useState(String(initial.base_salary ?? 0));
  const [vp, setVp] = useState(String(initial.variable_percent ?? 0));
  const [saving, setSaving] = useState(false);

  const canSave = useMemo(
    () => Number(base) >= 0 && Number(vp) >= 0,
    [base, vp]
  );

  const save = async () => {
    if (!canSave) return;
    setSaving(true);
    onError(null);
    try {
      const r = await api<PayrollResp>(endpoints.payroll.update, {
        method: "PUT",
        body: { base_salary: Number(base), variable_percent: Number(vp) },
      });
      onSaved(r);
    } catch (e: any) {
      onError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Configuración</div>

      <div className="grid gap-2 lg:grid-cols-3">
        <TextField
          label="Salario básico"
          value={base}
          onChange={setBase}
          type="number"
          placeholder="Ej: 2965901"
        />

        <TextField
          label="Variable (porcentaje)"
          value={vp}
          onChange={setVp}
          type="number"
          placeholder="Ej: 0.30"
        />

        <button
          onClick={save}
          disabled={saving || !canSave}
          className="h-[42px] self-end rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
