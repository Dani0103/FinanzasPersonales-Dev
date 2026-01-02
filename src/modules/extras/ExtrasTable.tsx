import type { Extra } from "@/modules/extras/extras.types";
import { money } from "@/modules/extras/extras.types";

export default function ExtrasTable({ items }: { items: Extra[] }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Listado</div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300">
            <tr className="border-b border-slate-800">
              <th className="py-2 text-left font-medium">Fecha</th>
              <th className="py-2 text-left font-medium">Descripción</th>
              <th className="py-2 text-right font-medium">Valor</th>
            </tr>
          </thead>

          <tbody>
            {items.map((x) => (
              <tr key={x.id} className="border-b border-slate-800/60">
                <td className="py-2 text-slate-200">{x.received_on}</td>
                <td className="py-2">
                  <div className="font-medium text-slate-100">
                    {x.description}
                  </div>
                  {x.notes ? (
                    <div className="text-xs text-slate-400">{x.notes}</div>
                  ) : null}
                </td>
                <td className="py-2 text-right text-slate-200">
                  $ {money(Number(x.amount))}
                </td>
              </tr>
            ))}

            {!items.length ? (
              <tr>
                <td className="py-6 text-center text-slate-400" colSpan={3}>
                  Sin extras para este filtro.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
