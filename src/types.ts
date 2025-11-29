interface LayoutProps {
  children: React.ReactNode;
}

interface ExportDtoRequest {
  employeeId: number;
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
};
