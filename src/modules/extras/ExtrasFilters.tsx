import SelectField from "../../components/ui/SelectField";
import type { Period } from "./extras.types";

export default function ExtrasFilters({
  periods,
  value,
  onChange,
}: {
  periods: Period[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <SelectField
      label="Filtro periodo"
      value={value}
      onChange={onChange}
      options={[
        { value: "", label: "Todos" },
        ...periods.map((p) => ({
          value: String(p.id),
          label: p.label ?? `${p.date_from} → ${p.date_to}`,
        })),
      ]}
    />
  );
}
