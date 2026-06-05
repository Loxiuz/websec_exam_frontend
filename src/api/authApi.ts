import { API_URL } from "../constants/settings";
import type {
  LoginRequest,
  IsLoggedInResponse,
  LogoutResponse,
  UserPermissionsResponse,
} from "../types";

const authUrl = `${API_URL}/auth`;

async function login(login: LoginRequest): Promise<string> {
  const response = await fetch(authUrl + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login),
  });
  if (!response.ok) {
    throw new Error("Login failed.");
  }

  return await response.json();
}

async function logout(): Promise<LogoutResponse> {
  const response = await fetch(authUrl + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Logout failed. Please try again.");
  }
  return await response.json();
}

async function isLoggedIn(): Promise<IsLoggedInResponse> {
  const Response = await fetch(authUrl + "/logged-in", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!Response.ok) {
    throw new Error("Failed to verify login status.");
  }

  return await Response.json();
}

async function getCurrentUserPermissions(): Promise<UserPermissionsResponse> {
  const response = await fetch(authUrl + "/permissions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user permissions.");
  }

  return await response.json();
}

export { login, logout, isLoggedIn, getCurrentUserPermissions };
