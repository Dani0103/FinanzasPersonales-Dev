import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getToken, logout } from "@/auth/auth";

import {
  FaHome,
  FaMoneyCheckAlt,
  FaGift,
  FaExchangeAlt,
  FaWallet,
  FaCalendarAlt,
} from "react-icons/fa";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
    isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900"
  }`;

export default function Navbar() {
  const token = getToken();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login" || location.pathname === "/register")
    return null;

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
        <div className="mr-2 text-base font-semibold flex flex-col">
          <span>FinDash</span>
          <span>Daniel Felipe Ruiz Tovar</span>
        </div>

        <nav className="flex flex-wrap gap-1">
          <NavLink to="/dashboard" className={linkClass}>
            <FaHome /> Dashboard
          </NavLink>

          <NavLink to="/payroll" className={linkClass}>
            <FaMoneyCheckAlt /> Salario
          </NavLink>

          <NavLink to="/movements" className={linkClass}>
            <FaExchangeAlt /> Movimientos
          </NavLink>

          <NavLink to="/extras" className={linkClass}>
            <FaGift /> Extras
          </NavLink>

          <NavLink to="/accounts" className={linkClass}>
            <FaWallet /> Cuentas
          </NavLink>

          <NavLink to="/periods" className={linkClass}>
            <FaCalendarAlt /> Periodos
          </NavLink>
        </nav>

        <div className="ml-auto">
          {token ? (
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium hover:bg-rose-500"
            >
              Salir
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
