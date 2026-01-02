import type { PayrollResp } from "@/modules/payroll/payroll.types";
import { money } from "@/modules/payroll/payroll.types";

export default function PayrollDeductions({
  items,
}: {
  items: PayrollResp["deductions"];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Descuentos</div>

      <div className="grid gap-2">
        {items.map((d) => (
          <div
            key={d.code}
            className="flex justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
          >
            <div className="text-slate-200">{d.label}</div>
            <div className="text-slate-200">$ {money(Number(d.amount))}</div>
          </div>
        ))}

        {!items.length ? (
          <div className="text-sm text-slate-400">
            No tienes reglas de descuento activas.
          </div>
        ) : null}
      </div>
    </div>
  );
}
