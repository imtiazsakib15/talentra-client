import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ReactNode } from "react";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import type { UserRole } from "@/types";

const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (!user) return <Navigate to="/login" replace />;

  if (user?.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
