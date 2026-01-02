import Select from "@/components/ui/Select";

type Opt = { value: string; label: string };

export default function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
}) {
  return (
    <div className="grid gap-1">
      <label className="text-xs text-slate-300">{label}</label>
      <Select value={value} onChange={onChange} options={options} />
    </div>
  );
}
