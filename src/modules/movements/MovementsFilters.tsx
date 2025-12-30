import SelectField from "../../components/ui/SelectField";
import type { Account, Period } from "./movements.types";
import { KIND, STATUS } from "./movements.types";

export default function MovementsFilters({
  periods,
  accounts,
  value,
  onChange,
}: {
  periods: Period[];
  accounts: Account[];
  value: { period: string; account: string; kind: string; status: string };
  onChange: (next: {
    period: string;
    account: string;
    kind: string;
    status: string;
  }) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <SelectField
        label="Periodo"
        value={value.period}
        onChange={(v) => onChange({ ...value, period: v })}
        options={[
          { value: "", label: "Todos" },
          ...periods.map((p) => ({
            value: String(p.id),
            label: p.label ?? `${p.date_from} → ${p.date_to}`,
          })),
        ]}
      />

      <SelectField
        label="Cuenta"
        value={value.account}
        onChange={(v) => onChange({ ...value, account: v })}
        options={[
          { value: "", label: "Todas" },
          ...accounts.map((a) => ({ value: String(a.id), label: a.name })),
        ]}
      />

      <SelectField
        label="Tipo"
        value={value.kind}
        onChange={(v) => onChange({ ...value, kind: v })}
        options={[
          { value: "", label: "Todos" },
          ...KIND.map((k) => ({ value: String(k.id), label: k.label })),
        ]}
      />

      <SelectField
        label="Estado"
        value={value.status}
        onChange={(v) => onChange({ ...value, status: v })}
        options={[
          { value: "", label: "Todos" },
          ...STATUS.map((s) => ({ value: String(s.id), label: s.label })),
        ]}
      />
    </div>
  );
}
