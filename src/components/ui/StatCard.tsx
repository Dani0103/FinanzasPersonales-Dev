import { cardVariants } from "@/styles/variants";

export default function StatCard({
  title,
  value,
  color = "slate",
}: {
  title: string;
  value: string;
  color?: keyof typeof cardVariants;
}) {
  const base = cardVariants[color] ?? " border-slate-800 bg-slate-900/40"; // fallback

  return (
    <div className={`rounded-xl p-4 border-2 ${base}`}>
      <div className="text-xs text-slate-400">{title}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
