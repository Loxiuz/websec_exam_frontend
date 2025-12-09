import type { ReactNode } from "react";
import { useAuth } from "./useAuth";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ allowedRoles, children }: { allowedRoles: string[]; children: ReactNode }) {
  const { auth } = useAuth();
  console.log("Access granted to role:", auth?.role);
  if (!auth?.accessToken) return <Navigate to="/login" />;
  if (!allowedRoles.includes(auth.role)) return <Navigate to="/unauthorized" />;
  return children;
}