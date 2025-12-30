type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  autoComplete?: string;
};

export default function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: Props) {
  return (
    <div className="grid gap-1">
      <label className="text-xs text-slate-300">{label}</label>
      <input
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-indigo-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
      />
    </div>
  );
}
