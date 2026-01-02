import { useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import TextField from "@/components/ui/TextField";
import SelectField from "@/components/ui/SelectField";
import type { DeductionType } from "@/modules/payroll/deductions.types";

export default function DeductionRuleForm({
  types,
  onCreated,
  onError,
}: {
  types: DeductionType[];
  onCreated: () => void;
  onError: (msg: string | null) => void;
}) {
  const [typeId, setTypeId] = useState(types[0] ? String(types[0].id) : "");
  const [mode, setMode] = useState<"FIXED" | "PERCENT">("FIXED");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const canSave = useMemo(
    () => !!typeId && !!from && Number(value) > 0,
    [typeId, from, value]
  );

  const save = async () => {
    if (!canSave) return;
    setLoading(true);
    onError(null);

    try {
      await api<{ id: number }>(endpoints.deductions.rules, {
        method: "POST",
        body: {
          deduction_type_id: Number(typeId),
          calc_mode: mode,
          value: Number(value),
          effective_from: from,
          effective_to: to ? to : null,
        },
      });

      setValue("");
      setFrom("");
      setTo("");
      onCreated();
    } catch (e: any) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const valuePlaceholder = mode === "FIXED" ? "Ej: 154588" : "Ej: 0.04";

  return (
    <div className="grid gap-2 lg:grid-cols-6">
      <SelectField
        label="Tipo"
        value={typeId}
        onChange={setTypeId}
        options={types.map((t) => ({ value: String(t.id), label: t.label }))}
      />

      <SelectField
        label="Modo"
        value={mode}
        onChange={(v) => setMode(v as any)}
        options={[
          { value: "FIXED", label: "Valor fijo" },
          { value: "PERCENT", label: "Porcentaje" },
        ]}
      />

      <TextField
        label="Valor"
        value={value}
        onChange={setValue}
        type="number"
        placeholder={valuePlaceholder}
      />

      <TextField label="Desde" value={from} onChange={setFrom} type="date" />

      <TextField
        label="Hasta (opcional)"
        value={to}
        onChange={setTo}
        type="date"
      />

      <div className="flex items-end">
        <button
          onClick={save}
          disabled={loading || !canSave}
          className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
        >
          {loading ? "Creando..." : "Agregar"}
        </button>
      </div>
    </div>
  );
}
