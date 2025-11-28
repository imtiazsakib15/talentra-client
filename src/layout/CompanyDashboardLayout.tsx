import { Outlet } from "react-router";
import { Menu, Users, Building2, LogOut, Send } from "lucide-react";
import { useState } from "react";
import SideLink from "@/components/company-dashboard/SideLink";

export default function CompanyDashboardLayout() {
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
            Company Panel
          </h1>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          <SideLink
            to="/company/dashboard"
            icon={<Building2 />}
            label="Overview"
            open={open}
          />
          <SideLink
            to="/company/dashboard/search-candidates"
            icon={<Users />}
            label="Find Candidates"
            open={open}
          />
          <SideLink
            to="/company/dashboard/sent-interests"
            icon={<Send />}
            label="Sent Interests"
            open={open}
          />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <SideLink to="/logout" icon={<LogOut />} label="Logout" open={open} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
