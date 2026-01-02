import { useEffect, useMemo, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import TextField from "@/components/ui/TextField";
import SelectField from "@/components/ui/SelectField";
import type { Account, Period } from "@/modules/movements/movements.types";
import { KIND, STATUS } from "@/modules/movements/movements.types";

export default function MovementForm({
  accounts,
  periods,
  onCreated,
  onError,
}: {
  accounts: Account[];
  periods: Period[];
  onCreated: () => void;
  onError: (msg: string | null) => void;
}) {
  const [accountId, setAccountId] = useState("");
  const [periodId, setPeriodId] = useState("");
  const [kindId, setKindId] = useState(String(KIND[0].id));
  const [statusId, setStatusId] = useState(String(STATUS[0].id));
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [movementDate, setMovementDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (accounts[0] && !accountId) setAccountId(String(accounts[0].id));
    if (periods[0] && !periodId) setPeriodId(String(periods[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts, periods]);

  const canSave = useMemo(() => {
    return (
      !!accountId &&
      !!description.trim() &&
      !!movementDate &&
      Number(amount) > 0
    );
  }, [accountId, description, movementDate, amount]);

  const save = async () => {
    if (!canSave) return;
    setLoading(true);
    onError(null);

    try {
      await api<{ id: number }>(endpoints.movements.create, {
        method: "POST",
        body: {
          account_id: Number(accountId),
          period_id: periodId ? Number(periodId) : null,
          kind_id: Number(kindId),
          status_id: Number(statusId),
          description,
          notes: notes || null,
          amount: Number(amount),
          movement_date: movementDate,
        },
      });

      setDescription("");
      setNotes("");
      setAmount("0");
      setMovementDate("");
      onCreated();
    } catch (e: any) {
      onError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-xl border-2 border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Nuevo movimiento</div>

      <div className="grid gap-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <TextField
            label="Descripción"
            value={description}
            onChange={setDescription}
            placeholder="Ej: Mercado, Netflix..."
          />
        </div>

        <SelectField
          label="Cuenta"
          value={accountId}
          onChange={setAccountId}
          options={accounts.map((a) => ({
            value: String(a.id),
            label: a.name,
          }))}
        />

        <SelectField
          label="Periodo"
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

        <SelectField
          label="Tipo"
          value={kindId}
          onChange={setKindId}
          options={KIND.map((k) => ({ value: String(k.id), label: k.label }))}
        />

        <SelectField
          label="Estado"
          value={statusId}
          onChange={setStatusId}
          options={STATUS.map((s) => ({ value: String(s.id), label: s.label }))}
        />

        <div className="lg:col-span-1">
          <TextField
            label="Fecha"
            value={movementDate}
            onChange={setMovementDate}
            type="date"
          />
        </div>

        <div className="lg:col-span-3">
          <TextField
            label="Notas (opcional)"
            value={notes}
            onChange={setNotes}
            placeholder="Ej: pagarlo el viernes..."
          />
        </div>

        <div className="lg:col-span-2">
          <TextField
            label="Valor"
            value={amount}
            onChange={setAmount}
            type="number"
            placeholder="Ej: 150000"
          />
        </div>

        <div className="flex items-end lg:col-span-6">
          <button
            onClick={save}
            disabled={loading || !canSave}
            className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
