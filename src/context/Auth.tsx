import { Authentication } from "@/components/Auth";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!Authentication()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
