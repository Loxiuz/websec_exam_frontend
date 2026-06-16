import RequireAuth from "../auth/RequireAuth";
import type { ExportDtoResponse } from "../types";
import "./ExportRequestTable.css";

function createDateString(dateString: string): string {
  const date = new Date(dateString);

  const timeWithoutSeconds = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return date.toLocaleDateString() + " | " + timeWithoutSeconds;
}

export default function ExportRequestTable({
  exportRequests,
  setSelectedExportRequest,
  setDialogOpen,
  setNotesDialogOpen,
}: {
  exportRequests: ExportDtoResponse[];
  setSelectedExportRequest: (request: ExportDtoResponse) => void;
  setDialogOpen: (open: boolean) => void;
  setNotesDialogOpen: (open: boolean) => void;
}) {
  return (
    <table id="export-request-table">
      <thead id="export-request-table-header">
        <tr>
          <th>Employee ID </th>
          <th>Format</th>
          <th>Creation</th>
          <th>Entities</th>
          <th>Filename</th>
          <th>Status</th>
          <th>Size (KB)</th>
          <th>Filters</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody id="export-request-table-body">
        {exportRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.employeeId}</td>
            <td>{request.exportFormat}</td>
            <td>{createDateString(request.exportCreation)}</td>
            <td>{request.selectedEntities}</td>
            <td>{request.fileName}</td>
            <td>{request.status}</td>
            <td>{request.fileSize ?? "N/A"}</td>
            <td>
              <button
                onClick={() => {
                  setSelectedExportRequest(request);
                  setDialogOpen(true);
                }}
              >
                ...
              </button>
            </td>
            <RequireAuth permission="VIEW_NOTES" redirectOnDeny={false}>
              <td>
                <button
                  onClick={() => {
                    setSelectedExportRequest(request);
                    setNotesDialogOpen(true);
                  }}
                >
                  ...
                </button>
              </td>
            </RequireAuth>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
