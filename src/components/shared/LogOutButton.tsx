import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOutIcon } from "lucide-react";

const LogOutButton = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 p-3 rounded-xl transition-all text-slate-700 hover:bg-slate-100 w-full text-sm font-medium"
    >
      <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
      <span>Logout</span>
    </button>
  );
};

export default LogOutButton;
