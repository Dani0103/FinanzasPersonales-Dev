import StatCard from "@/components/ui/StatCard";
import { money } from "@/modules/payroll/payroll.types";
import type { PayrollResp } from "@/modules/payroll/payroll.types";

export default function PayrollSummary({
  summary,
}: {
  summary: PayrollResp["summary"];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Básico"
        value={`$ ${money(summary.basic)}`}
        color="blue"
      />

      <StatCard
        title="Variable"
        value={`$ ${money(summary.variable)}`}
        color="amber"
      />

      <StatCard
        title="Descuentos"
        value={`$ ${money(summary.total_deductions)}`}
        color="red"
      />

      <StatCard title="Neto" value={`$ ${money(summary.net)}`} color="green" />
    </div>
  );
}
