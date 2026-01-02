import type { Account, Movement } from "@/modules/movements/movements.types";
import { KIND, STATUS } from "@/modules/movements/movements.types";

const money = (n: number) => n.toLocaleString("es-CO");

export default function MovementsTable({
  items,
  accounts,
}: {
  items: Movement[];
  accounts: Account[];
}) {
  const accountName = (id: number) =>
    accounts.find((a) => a.id === id)?.name ?? `#${id}`;
  const kindLabel = (id: number) =>
    KIND.find((k) => k.id === id)?.label ?? `#${id}`;
  const statusLabel = (id: number) =>
    STATUS.find((s) => s.id === id)?.label ?? `#${id}`;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 text-sm font-semibold">Listado</div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300">
            <tr className="border-b border-slate-800">
              <th className="py-2 text-left font-medium">Fecha</th>
              <th className="py-2 text-left font-medium">Descripción</th>
              <th className="py-2 text-left font-medium">Cuenta</th>
              <th className="py-2 text-left font-medium">Tipo</th>
              <th className="py-2 text-left font-medium">Estado</th>
              <th className="py-2 text-right font-medium">Valor</th>
            </tr>
          </thead>

          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/60">
                <td className="py-2 text-slate-200">{m.movement_date}</td>
                <td className="py-2">
                  <div className="font-medium text-slate-100">
                    {m.description}
                  </div>
                  {m.notes ? (
                    <div className="text-xs text-slate-400">{m.notes}</div>
                  ) : null}
                </td>
                <td className="py-2 text-slate-200">
                  {accountName(m.account_id)}
                </td>
                <td className="py-2 text-slate-200">{kindLabel(m.kind_id)}</td>
                <td className="py-2">
                  <span className="inline-flex rounded-full border border-slate-800 bg-slate-950 px-2 py-1 text-xs text-slate-200">
                    {statusLabel(m.status_id)}
                  </span>
                </td>
                <td className="py-2 text-right text-slate-200">
                  $ {money(Number(m.amount))}
                </td>
              </tr>
            ))}

            {!items.length ? (
              <tr>
                <td className="py-6 text-center text-slate-400" colSpan={6}>
                  Sin movimientos con estos filtros.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
