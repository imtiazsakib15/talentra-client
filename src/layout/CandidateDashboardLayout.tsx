import { Outlet } from "react-router";
import { cn } from "@/lib/utils";
import { User, Mail, Calendar, Menu } from "lucide-react";
import { NavLink } from "react-router";
import { useState } from "react";

const sidebarLinks = [
  // {
  //   to: "/candidate/dashboard",
  //   label: "Dashboard",
  //   icon: <LayoutDashboard size={18} />,
  // },
  { to: "/candidate/profile", label: "My Profile", icon: <User size={18} /> },
  {
    to: "/candidate/received-invitations",
    label: "Invitations",
    icon: <Mail size={18} />,
  },
  {
    to: "/candidate/interviews",
    label: "Interviews",
    icon: <Calendar size={18} />,
  },
];

export default function CandidateDashboardLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-20"
        } transition-all duration-300 bg-white shadow-xl border-r border-slate-200 flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h1
            className={`text-xl font-semibold text-indigo-600 transition-all duration-300 ${
              !open && "opacity-0 w-0"
            }`}
          >
            Candidate Panel
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
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
