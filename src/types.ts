interface LayoutProps {
  children: React.ReactNode;
}

interface LoginResponse{
  role: string;
  employeeId: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface IsLoggedInResponse {
  loggedIn: boolean;
}

interface AuthContextType {
  auth: LoginResponse | null;
  setAuth: (auth: LoginResponse | null) => void;
}

interface ExportDtoRequest {
  id: string | null,
  employeeId: string;
  exportFormat: string;
  selectedEntities: string;
  appliedFilters: AppliedFilters;
  fileName: string;
}

interface ExportDtoResponse {
  id: number;
  employeeId: number;
  exportFormat: string;
  exportCreation: string;
  selectedEntities: string;
  appliedFilters: AppliedFilters;
  fileName: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  fileSize?: number;
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
  LoginResponse,
  LoginRequest,
  AuthContextType,
  IsLoggedInResponse
};
