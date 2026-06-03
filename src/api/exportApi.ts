import { API_URL } from "../constants/settings";
import type {
  ExportDtoRequest,
  ExportDtoResponse,
  ExportNoteRequest,
  ExportNotes,
} from "../types";

const exportUrl = `${API_URL}/export`;

async function createExportRequest(
  exportRequestDTO: ExportDtoRequest,
): Promise<boolean> {
  const response = await fetch(exportUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exportRequestDTO),
  });

  if (response.ok) {
    downloadFile(response, exportRequestDTO.fileName);
    return true;
  } else {
    throw new Error("Failed to download the file.");
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

async function createExportNotes(
  exportNotes: ExportNoteRequest,
): Promise<ExportNotes> {
  const response = await fetch(`${exportUrl}/notes/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(exportNotes),
  });

  if (!response.ok) {
    throw new Error("Failed to create export note.");
  }

  return response.json();
}

async function getExportNotesByExportRequestId(
  exportRequestId: string,
): Promise<ExportNotes[]> {
  const response = await fetch(
    `${API_URL}/export-notes/exportRequest/${exportRequestId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch export notes.");
  }

  return response.json();
}

async function getAllExportNotes(): Promise<ExportNotes[]> {
  const response = await fetch(`${API_URL}/notes/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all export notes.");
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

export {
  createExportRequest,
  getAllExportRequests,
  createExportNotes,
  getExportNotesByExportRequestId,
  getAllExportNotes,
};
