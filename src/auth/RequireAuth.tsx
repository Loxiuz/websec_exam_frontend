import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../api/authApi";



export default function RequireAuth({ allowedRoles, children }: { allowedRoles: string[]; children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);
  const role = localStorage.getItem("role");

  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await isLoggedIn();
        setLoggedIn(response.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkStatus();
  }, [setLoggedIn, loggedIn]);

  if (loggedIn === undefined) return <div>Loading...</div>;
  if (!loggedIn) return <Navigate to="/login" />;
  if (role != null && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
}