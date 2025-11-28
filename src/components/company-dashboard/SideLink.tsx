import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useLocation } from "react-router";

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
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname === to);
  }, [to, location.pathname]);

  return (
    <NavLink
      to={to}
      className={() =>
        `flex items-center gap-3 p-3 rounded-xl transition-all ${
          isActive
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {open && <span className="font-medium text-sm">{label}</span>}
    </NavLink>
  );
};
export default SideLink;
