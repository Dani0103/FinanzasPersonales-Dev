import { useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import SelectField from "@/components/ui/SelectField";
import TextField from "@/components/ui/TextField";
import type { Period } from "@/modules/extras/extras.types";

export default function ExtraForm({
  periods,
  onCreated,
  onError,
}: {
  periods: Period[];
  onCreated: () => void;
  onError: (msg: string | null) => void;
}) {
  const [periodId, setPeriodId] = useState("");
  const [receivedOn, setReceivedOn] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("0");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (periods[0] && !periodId) setPeriodId(String(periods[0].id));
  }, [periods, periodId]);

  const canSave = useMemo(
    () => !!receivedOn && !!description.trim() && Number(amount) > 0,
    [receivedOn, description, amount]
  );

  const save = async () => {
    if (!canSave) return;
    setLoading(true);
    onError(null);

    try {
      await api<{ id: number }>(endpoints.extras.create, {
        method: "POST",
        body: {
          period_id: periodId ? Number(periodId) : null,
          received_on: receivedOn,
          description,
          amount: Number(amount),
          notes: notes || null,
        },
      });

      setReceivedOn("");
      setDescription("");
      setAmount("0");
      setNotes("");
      onCreated();
    } catch (e: any) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Nuevo extra</div>

      <div className="grid gap-2 lg:grid-cols-6">
        <SelectField
          label="Periodo (opcional)"
          value={periodId}
          onChange={setPeriodId}
          options={[
            { value: "", label: "(Sin periodo)" },
            ...periods.map((p) => ({
              value: String(p.id),
              label: p.label ?? `${p.date_from} → ${p.date_to}`,
            })),
          ]}
        />

        <TextField
          label="Fecha"
          value={receivedOn}
          onChange={setReceivedOn}
          type="date"
        />

        <div className="lg:col-span-2">
          <TextField
            label="Descripción"
            value={description}
            onChange={setDescription}
            placeholder="Ej: Trabajo freelance"
          />
        </div>

        <TextField
          label="Valor"
          value={amount}
          onChange={setAmount}
          type="number"
        />

        <div className="lg:col-span-2">
          <TextField
            label="Notas (opcional)"
            value={notes}
            onChange={setNotes}
            placeholder="Ej: cliente X"
          />
        </div>

        <div className="flex items-end lg:col-span-4">
          <button
            onClick={save}
            disabled={loading || !canSave}
            className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
}
