// export default function BudgetTable() {
//   return (
//     <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 overflow-auto">
//       <table className="min-w-[900px] border-collapse text-xs text-slate-200">
//         <thead>
//           <tr>
//             <th className="border border-slate-700 p-2 bg-slate-800 text-center">
//               Pago
//             </th>
//             <th className="border border-slate-700 p-2 bg-slate-800 text-center">
//               Tipo
//             </th>
//             <th className="border border-slate-700 p-2 bg-slate-800 text-center">
//               Observación
//             </th>
//             <th className="border border-slate-700 p-2 bg-slate-800 text-center">
//               Gastos
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {/* FILAS MOVIMIENTOS */}
//           {[
//             ["Pendiente", "Gasto", "Moto", "100,000"],
//             ["Debo", "Gasto", "Internet", "50,000"],
//             ["Pagado", "Gasto", "parqueadero casa", "50,000"],
//             ["Pagado", "Gasto", "Plan celular", "100,000"],
//             ["Pagado", "Gasto", "Futbol", "150,000"],
//             ["Pagado", "Gasto", "Luz", "101,000"],
//             ["Pagado", "Gasto", "Mila", "490,000"],
//             ["Debo", "Gasto", "Deuda tarjeta", "2,530,000"],
//           ].map((row, i) => (
//             <tr key={i}>
//               <td className="border border-slate-700 p-2 text-center">
//                 {row[0]}
//               </td>
//               <td className="border border-slate-700 p-2 text-center">
//                 {row[1]}
//               </td>
//               <td className="border border-slate-700 p-2">{row[2]}</td>
//               <td className="border border-slate-700 p-2 text-right">
//                 $ {row[3]}
//               </td>
//             </tr>
//           ))}

//           {/* FOOTER NUMERICOS */}
//           <tr>
//             <td
//               colSpan={3}
//               className="border border-slate-700 p-2 font-semibold"
//             >
//               Ingresos
//             </td>
//             <td className="border border-slate-700 p-2 text-right">
//               $ 3,537,004
//             </td>
//           </tr>

//           <tr>
//             <td
//               colSpan={3}
//               className="border border-slate-700 p-2 font-semibold"
//             >
//               Ingresos + extra + Prima
//             </td>
//             <td className="border border-slate-700 p-2 text-right">
//               $ 5,525,506
//             </td>
//           </tr>

//           <tr>
//             <td
//               colSpan={3}
//               className="border border-slate-700 p-2 font-semibold"
//             >
//               Gastos
//             </td>
//             <td className="border border-slate-700 p-2 text-right">
//               $ 3,621,000
//             </td>
//           </tr>

//           <tr className="bg-yellow-700/40">
//             <td
//               colSpan={3}
//               className="border border-slate-700 p-2 font-semibold"
//             >
//               Libres
//             </td>
//             <td className="border border-slate-700 p-2 text-right">
//               $ 1,904,506
//             </td>
//           </tr>

//           <tr className="bg-yellow-600/30">
//             <td
//               colSpan={3}
//               className="border border-slate-700 p-2 font-semibold"
//             >
//               Gastos x semana
//             </td>
//             <td className="border border-slate-700 p-2 text-right">
//               $ 476,127
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

type Row = {
  pago: string;
  tipo: string;
  observacion: string;
  gasto: number;
};

export default function BudgetTable({
  rows,
  income,
  expenses,
  free,
  weekly,
}: {
  rows: Row[];
  income: number;
  expenses: number;
  free: number;
  weekly: number;
}) {
  const money = (n: number) => n.toLocaleString("es-CO");

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 overflow-auto">
      <table className="w-full border-collapse text-xs text-slate-200">
        <thead>
          <tr>
            <th className="border border-slate-700 p-2 bg-slate-800 text-center">
              Pago
            </th>
            <th className="border border-slate-700 p-2 bg-slate-800 text-center">
              Tipo
            </th>
            <th className="border border-slate-700 p-2 bg-slate-800 text-center">
              Observación
            </th>
            <th className="border border-slate-700 p-2 bg-slate-800 text-center">
              Gastos
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="border border-slate-700 p-2 text-center">
                {r.pago}
              </td>
              <td className="border border-slate-700 p-2 text-center">
                {r.tipo}
              </td>
              <td className="border border-slate-700 p-2">{r.observacion}</td>
              <td className="border border-slate-700 p-2 text-right">
                $ {money(r.gasto)}
              </td>
            </tr>
          ))}

          <tr className="border-t-4 border-slate-700">
            <td
              colSpan={3}
              className="border border-slate-700 p-2 font-semibold"
            >
              Ingresos
            </td>
            <td className="border border-slate-700 p-2 text-right bg-blue-400/40">
              $ {money(income)}
            </td>
          </tr>
          <tr>
            <td
              colSpan={3}
              className="border border-slate-700 p-2 font-semibold"
            >
              Gastos
            </td>
            <td className="border border-slate-700 p-2 text-right bg-orange-700/40">
              $ {money(expenses)}
            </td>
          </tr>

          <tr className="">
            <td
              colSpan={3}
              className="border border-slate-700 p-2 font-semibold"
            >
              Libres
            </td>
            <td className="border border-slate-700 p-2 text-right bg-green-700/40">
              $ {money(free)}
            </td>
          </tr>

          <tr className="">
            <td
              colSpan={3}
              className="border border-slate-700 p-2 font-semibold"
            >
              Gastos x semana
            </td>
            <td className="border border-slate-700 p-2 text-right bg-yellow-600/30">
              $ {money(weekly)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
