import StatCard from "../../components/ui/StatCard";
import { money } from "./payroll.types";
import type { PayrollResp } from "./payroll.types";

export default function PayrollSummary({
  summary,
}: {
  summary: PayrollResp["summary"];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Básico" value={`$ ${money(summary.basic)}`} />
      <StatCard title="Variable" value={`$ ${money(summary.variable)}`} />
      <StatCard
        title="Descuentos"
        value={`$ ${money(summary.total_deductions)}`}
      />
      <StatCard title="Neto" value={`$ ${money(summary.net)}`} />
    </div>
  );
}
