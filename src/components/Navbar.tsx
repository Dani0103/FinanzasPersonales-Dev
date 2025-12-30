import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getToken, logout } from "../auth/auth";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm transition ${
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
        <div className="mr-2 text-base font-semibold">Finanzas</div>

        <nav className="flex flex-wrap gap-1">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/accounts" className={linkClass}>
            Cuentas
          </NavLink>
          <NavLink to="/periods" className={linkClass}>
            Periodos
          </NavLink>
          <NavLink to="/movements" className={linkClass}>
            Movimientos
          </NavLink>
          <NavLink to="/extras" className={linkClass}>
            Extras
          </NavLink>
          <NavLink to="/payroll" className={linkClass}>
            Salario
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
