import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import Alert from "@/components/ui/Alert";
import PayrollForm from "@/modules/payroll/PayrollForm";
import PayrollSummary from "@/modules/payroll/PayrollSummary";
import PayrollDeductions from "@/modules/payroll/PayrollDeductions";
import DeductionRulesPanel from "@/modules/payroll/DeductionRulesPanel";
import type { PayrollResp } from "@/modules/payroll/payroll.types";

export default function PayrollPage() {
  const [data, setData] = useState<PayrollResp | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setError(null);
    setData(await api<PayrollResp>(endpoints.payroll.get));
  };

  useEffect(() => {
    load().catch((e) => setError(e.message));
  }, []);

  if (!data) return <div className="text-slate-300">Cargando...</div>;

  return (
    <div className="grid gap-4">
      <div>
        <div className="text-xl font-semibold">Salario</div>
        <div className="text-sm text-slate-300">
          Básico + variable + descuentos
        </div>
      </div>

      <PayrollForm
        initial={data.profile}
        onSaved={setData}
        onError={setError}
      />

      {error ? <Alert text={error} /> : null}

      <PayrollSummary summary={data.summary} />
      <PayrollDeductions items={data.deductions} />

      {/* ✅ NUEVO: administrar reglas */}
      <DeductionRulesPanel onChanged={load} />
    </div>
  );
}
