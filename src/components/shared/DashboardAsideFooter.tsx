import { HomeIcon } from "lucide-react";
import { Link } from "react-router";
import LogOutButton from "./LogOutButton";

const DashboardAsideFooter = () => {
  return (
    <div>
      <div className="p-4 border-t border-slate-200">
        <Link
          to="/"
          className="flex items-center gap-2 p-3 rounded-xl transition-all text-slate-700 hover:bg-slate-100 w-full text-sm font-medium"
        >
          <HomeIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Go Home</span>
        </Link>
      </div>
      <div className="p-4 border-t border-slate-200">
        <LogOutButton />
      </div>
    </div>
  );
};

export default DashboardAsideFooter;
