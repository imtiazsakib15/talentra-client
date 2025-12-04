import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ReactNode } from "react";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (!user) return <Navigate to="/login" replace />;

  if (user?.role !== "ADMIN") {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
