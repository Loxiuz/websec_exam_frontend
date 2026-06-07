interface LayoutProps {
  children: React.ReactNode;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface IsLoggedInResponse {
  loggedIn: boolean;
}

interface UserPermissionsResponse {
  role: string;
  permissions: string[];
}

interface ExportDtoRequest {
  id: string | null;
  employeeId: string;
  exportFormat: string;
  selectedEntities: string;
  appliedFilters: AppliedFilters;
  fileName: string;
}

interface ExportDtoResponse {
  id: string;
  employeeId: string;
  exportFormat: string;
  exportCreation: string;
  selectedEntities: string;
  appliedFilters: AppliedFilters;
  fileName: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  fileSize?: number;
}

interface ExportNote {
  id: string | null;
  exportRequestId: string | null;
  employeeId: string | null;
  notes: string;
  creationDate: string;
}

interface ExportNoteRequest {
  exportRequestId: string;
  employeeId: string;
  notes: string;
}

/* Filter structure for export request body */
interface FilterField {
  field: string;
  value: string;
}

type EntityFilter = {
  [entity: string]: FilterField;
};

type AppliedFilters = EntityFilter[];
/* --------------------------------------- */

interface ValidExportFilterFields {
  entity: string;
  validFilterFields: string[];
}

export type {
  LayoutProps,
  ExportDtoRequest,
  ExportDtoResponse,
  ValidExportFilterFields,
  AppliedFilters,
  LoginRequest,
  IsLoggedInResponse,
  ExportNote as ExportNotes,
  ExportNoteRequest,
  UserPermissionsResponse,
};
