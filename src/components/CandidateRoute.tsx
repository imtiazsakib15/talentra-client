import { Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ReactNode } from "react";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { USER_ROLE } from "@/constants/user.constant";

const CandidateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  if (!user) return <Navigate to="/login" replace />;

  if (user?.role !== USER_ROLE.CANDIDATE) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default CandidateRoute;
