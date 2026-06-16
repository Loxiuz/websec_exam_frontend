import { API_URL } from "../constants/settings";
import { csrfHeaders } from "./authApi";

const employeeUrl = `${API_URL}/employees`;

async function uploadImageToEmployee(
  employeeId: string,
  imageFile: File,
): Promise<void> {
  const imageFormData = new FormData();
  imageFormData.append("file", imageFile);
  const response = await fetch(`${employeeUrl}/${employeeId}/upload-image`, {
    method: "POST",
    headers: {
      ...csrfHeaders(),
    },
    body: imageFormData,
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to upload image.");
  }
}

async function getEmployeeImage(employeeId: string): Promise<Blob> {
  const response = await fetch(`${employeeUrl}/${employeeId}/image`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch employee image.");
  }
  return response.blob();
}

export { uploadImageToEmployee, getEmployeeImage };
