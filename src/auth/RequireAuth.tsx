import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUserPermissions, isLoggedIn } from "../api/authApi";

export default function RequireAuth({
  permission,
  redirectOnDeny = true,
  children,
}: {
  permission?: string;
  redirectOnDeny?: boolean;
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    async function checkStatusAndPermission() {
      try {
        const loginStatus = await isLoggedIn();

        if (!loginStatus.loggedIn) {
          setLoggedIn(false);
          setIsAuthorized(false);
          return;
        }

        setLoggedIn(true);

        if (!permission) {
          setIsAuthorized(true);
          return;
        }

        const cachedPermissions = sessionStorage.getItem("userPermissions");
        const cachedUsername = sessionStorage.getItem("username");
        const cachedRole = sessionStorage.getItem("role");
        const cachedEmployeeId = sessionStorage.getItem("employeeId");

        if (
          cachedPermissions &&
          cachedUsername &&
          cachedRole &&
          cachedEmployeeId
        ) {
          const permissions = JSON.parse(cachedPermissions) as string[];
          setIsAuthorized(permissions.includes(permission));
          return;
        }

        const userPermissionsResponse = await getCurrentUserPermissions();
        sessionStorage.setItem(
          "userPermissions",
          JSON.stringify(userPermissionsResponse.permissions),
        );
        sessionStorage.setItem("username", userPermissionsResponse.username);
        sessionStorage.setItem("role", userPermissionsResponse.role);
        sessionStorage.setItem(
          "employeeId",
          userPermissionsResponse.employeeId,
        );

        setIsAuthorized(
          userPermissionsResponse.permissions.includes(permission),
        );
      } catch (error) {
        console.error("Error checking auth status:", error);
        setLoggedIn(false);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkStatusAndPermission();
  }, [permission]);

  if (isLoading) return <div>Loading...</div>;
  if (!loggedIn) return <Navigate to="/login" />;
  if (!isAuthorized) {
    return redirectOnDeny ? <Navigate to="/unauthorized" /> : null;
  }

  return children;
}
