import type { ReactNode } from "react";

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
