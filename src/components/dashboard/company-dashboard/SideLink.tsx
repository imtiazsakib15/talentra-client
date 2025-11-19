import type { ReactNode } from "react";
import { NavLink } from "react-router";

const SideLink = ({
  to,
  icon,
  label,
  open,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  open: boolean;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-slate-100 ${
          isActive
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "text-slate-700"
        }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {open && <span className="font-medium text-sm">{label}</span>}
    </NavLink>
  );
};
export default SideLink;
