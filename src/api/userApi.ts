import { API_URL } from "../constants/settings";
import type { AdminUserEmployeeResponse } from "../types";

const userUrl = `${API_URL}/users`;

async function getUsersWithEmployees(): Promise<AdminUserEmployeeResponse[]> {
  const response = await fetch(`${userUrl}/all/with-employees`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user employee info.");
  }
  return response.json();
}

export { getUsersWithEmployees };
