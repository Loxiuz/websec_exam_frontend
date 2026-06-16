import { API_URL } from "../constants/settings";
import type {
  LoginRequest,
  IsLoggedInResponse,
  UserPermissionsResponse,
} from "../types";

const authUrl = `${API_URL}/auth`;

async function login(login: LoginRequest): Promise<void> {
  const response = await fetch(authUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...csrfHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(login),
  });
  if (!response.ok) {
    throw new Error("Login failed.");
  }
}

async function logout(): Promise<string> {
  const response = await fetch(authUrl + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Logout failed.");
  }

  return await response.text();
}

async function register(login: LoginRequest): Promise<void> {
  const response = await fetch(authUrl + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...csrfHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(login),
  });
  if (!response.ok) {
    throw new Error("Registration failed.");
  }
}

async function isLoggedIn(): Promise<IsLoggedInResponse> {
  const Response = await fetch(authUrl + "/logged-in", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!Response.ok) {
    throw new Error("Failed to verify login status.");
  }

  return await Response.json();
}

async function getCurrentUserPermissions(): Promise<UserPermissionsResponse> {
  const response = await fetch(authUrl + "/me/permissions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user permissions.");
  }

  return await response.json();
  // return {
  //   role: "ROLE_ADMIN",
  //   permissions: [
  //     "MANAGE_USERS",
  //     "VIEW_EXPORTS",
  //     "VIEW_NOTES",
  //     "CREATE_EXPORT",
  //     "CREATE_NOTES",
  //   ],
  // };
}

function getCookie(name: string): string | null {
  const match = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);
  return match ? decodeURIComponent(match[1]) : null;
}

function csrfHeaders(): Record<string, string> {
  const token = getCookie("csrfToken");
  return token ? { "X-CSRF-Token": token } : {};
}

export { login, logout, register, isLoggedIn, getCurrentUserPermissions, csrfHeaders };
