import { Outlet } from "react-router";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, Mail, Calendar, Settings } from "lucide-react";
import { NavLink } from "react-router";

const sidebarLinks = [
  {
    to: "/candidate/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  { to: "/candidate/profile", label: "My Profile", icon: <User size={18} /> },
  {
    to: "/candidate/interests/received",
    label: "Interests",
    icon: <Mail size={18} />,
  },
  {
    to: "/candidate/interviews",
    label: "Interviews",
    icon: <Calendar size={18} />,
  },
  {
    to: "/candidate/settings",
    label: "Settings",
    icon: <Settings size={18} />,
  },
];

export default function CandidateDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm">
        <div className="p-6 text-xl font-bold text-indigo-600 tracking-wide">
          Candidate Panel
        </div>

        <nav className="px-4 space-y-1">
          {sidebarLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition",
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
