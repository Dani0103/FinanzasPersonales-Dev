import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { DeductionRule } from "@/modules/payroll/deductions.types";

export default function DeductionRulesTable({
  items,
  onDeleted,
  onError,
}: {
  items: DeductionRule[];
  onDeleted: () => void;
  onError: (msg: string | null) => void;
}) {
  const del = async (id: number) => {
    onError(null);
    try {
      await api<void>(endpoints.deductions.deleteRule(id), {
        method: "DELETE",
      });
      onDeleted();
    } catch (e: any) {
      onError(e.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-slate-300">
          <tr className="border-b border-slate-800">
            <th className="py-2 text-left font-medium">Tipo</th>
            <th className="py-2 text-left font-medium">Modo</th>
            <th className="py-2 text-left font-medium">Valor</th>
            <th className="py-2 text-center font-medium">Desde</th>
            <th className="py-2 text-center font-medium">Hasta</th>
            <th className="py-2 text-right font-medium">Acción</th>
          </tr>
        </thead>

        <tbody>
          {items.map((r) => (
            <tr key={r.id} className="border-b border-slate-800/60">
              <td className="py-2 text-slate-200">{r.label}</td>
              <td className="py-2 text-slate-200">
                {r.calc_mode === "FIXED" ? "Fijo" : "%"}
              </td>
              <td className="py-2 text-left text-slate-200">
                {r.calc_mode === "PERCENT"
                  ? r.value
                  : r.value.toLocaleString("es-CO")}
              </td>
              <td className="py-2 text-slate-200 text-center">
                {r.effective_from.split("T")[0]}
              </td>
              <td className="py-2 text-slate-200 text-center">
                {r.effective_to?.split("T")[0] ?? "—"}
              </td>
              <td className="py-2 text-right">
                <button
                  onClick={() => del(r.id)}
                  className="rounded-lg border border-rose-900/60 bg-rose-950/40 px-3 py-1.5 text-xs text-rose-200 hover:bg-rose-900/40"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {!items.length ? (
            <tr>
              <td className="py-6 text-center text-slate-400" colSpan={6}>
                Aún no tienes reglas. Agrega una arriba.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
