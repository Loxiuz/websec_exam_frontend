import { API_URL } from "../constants/settings";
import type {LoginResponse, LoginRequest, IsLoggedInResponse } from "../types";

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

async function isLoggedIn(): Promise<IsLoggedInResponse> {
    const Response = await fetch(authUrl + "/logged-in", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!Response.ok) {
        throw new Error("Failed to verify login status.");
    }

    const json = await Response.json() as IsLoggedInResponse

    return json;
    
}

export { login, isLoggedIn };
