import { API_URL } from "../constants/settings";
import type {LoginResponse, LoginRequest } from "../types";

const authUrl = `${API_URL}/auth`;

async function login(login: LoginRequest): Promise<LoginResponse> {
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
  
  return await response.json() as LoginResponse;
}

export { login };
