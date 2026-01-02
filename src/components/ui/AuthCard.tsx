import type { ReactNode } from "react";
import LogoFinDash from "@/assets/Logo.png";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-sm border border-slate-800 bg-slate-900/40 p-6 shadow-lg">
        <div className="bg-white rounded-xl h-40 mb-5">
          <img
            src={LogoFinDash}
            alt="Logo FinDash"
            className="w-full h-full object-cover mx-auto"
          />
        </div>
        <div className="mb-5">
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-slate-300">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}
