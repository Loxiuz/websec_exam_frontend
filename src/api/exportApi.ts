import { API_URL } from "../constants/settings";
import type {
  ExportDtoRequest,
  ExportDtoResponse,
  ExportNoteRequest,
  ExportNotes,
  IsHiddenDto,
} from "../types";
import { csrfHeaders } from "./authApi";

const exportUrl = `${API_URL}/export`;

async function createExportRequest(
  exportRequestDTO: ExportDtoRequest,
): Promise<boolean> {
  const response = await fetch(exportUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...csrfHeaders(),
    },
    credentials: "include",
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
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch export requests.");
  }

  return response.json();
}

async function getExportRequestByEmployeeId(
  employeeId: string,
): Promise<ExportDtoResponse[]> {
  const response = await fetch(`${exportUrl}/all-requests/${employeeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch export requests by employee id.");
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
      ...csrfHeaders(),
    },
    credentials: "include",
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
  const response = await fetch(`${exportUrl}/${exportRequestId}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch export notes.");
  }

  return response.json();
}

async function getAllExportNotes(): Promise<ExportNotes[]> {
  const response = await fetch(`${exportUrl}/notes/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all export notes.");
  }

  return response.json();
}

async function setExportNotesHidden(exportNoteId: string, isHidden: boolean) {
  const response = await fetch(`${exportUrl}/notes/${exportNoteId}/hidden`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ isHidden: isHidden }),
  });

  if (!response.ok) {
    throw new Error("Failed to update export note visibility.");
  }
}

async function isExportNotesHidden(exportNoteId: string): Promise<IsHiddenDto> {
  const response = await fetch(`${exportUrl}/notes/${exportNoteId}/is-hidden`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch export note visibility.");
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
  getExportRequestByEmployeeId,
  setExportNotesHidden,
  isExportNotesHidden,
};


