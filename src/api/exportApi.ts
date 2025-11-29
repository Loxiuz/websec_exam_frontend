import { API_URL } from "../constants/settings";
import type {ExportDtoRequest, ExportDtoResponse } from "../types";

const exportUrl = `${API_URL}/export`;

async function createExportRequest(
  exportRequestDTO: ExportDtoRequest
): Promise<boolean> {
  const response = await fetch(exportUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exportRequestDTO),
  });

  if (!response.ok) {
    throw new Error("Failed to download the file.");
  } else {
    downloadFile(response, exportRequestDTO.fileName);
    return true;
  }
}

async function getAllExportRequests(): Promise<ExportDtoResponse[]> {
  const response = await fetch(exportUrl + "/all-requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch export requests.");
  }

  return response.json();
}

async function downloadFile(response: Response, filename?: string) {
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename ?? "export.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
}

export { createExportRequest, getAllExportRequests };
