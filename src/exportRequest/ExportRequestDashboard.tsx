import { useEffect, useState } from "react";
import type { ExportDtoResponse, ExportNotes } from "../types";
import {
  getAllExportRequests,
  getExportNotesByExportRequestId,
} from "../api/exportApi";
import "./ExportRequestDashboard.css";
import DashboardAppliedFiltersDialog from "./DashboardAppliedFiltersDialog";
import ExportNotesDialog from "../exportNotes/ExportNotesDialog";

export default function ExportRequestDashboard() {
  const [exportRequests, setExportRequests] = useState<ExportDtoResponse[]>([]);
  const [filtersDialogOpen, setDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedExportRequest, setSelectedExportRequest] =
    useState<ExportDtoResponse>();
  const [selectedExportRequestNotes, setSelectedExportRequestNotes] =
    useState<ExportNotes[]>();

  useEffect(() => {
    const fetchExportRequests = async () => {
      try {
        const requests = await getAllExportRequests();
        setExportRequests(requests);
      } catch (error) {
        console.error("Error fetching export requests:", error);
      }
    };
    fetchExportRequests();
    const fetchNotes = async () => {
      if (selectedExportRequest) {
        try {
          const notes = await getExportNotesByExportRequestId(
            selectedExportRequest.id,
          );
          setSelectedExportRequestNotes(notes);
        } catch (error) {
          console.error("Error fetching notes for export request:", error);
        }
      }
    };
    fetchNotes();
  }, [selectedExportRequest]);

  function createDateString(dateString: string): string {
    const date = new Date(dateString);

    const timeWithoutSeconds = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return date.toLocaleDateString() + " | " + timeWithoutSeconds;
  }

  return (
    <div id="dashboard-container">
      <h1>Export Activity</h1>
      <table id="dashboard-table">
        <thead id="dashboard-header">
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
        <tbody id="dashboard-body">
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
            </tr>
          ))}
        </tbody>
      </table>

      <dialog open={filtersDialogOpen} id="applied-filters-dialog">
        <DashboardAppliedFiltersDialog
          appliedFilters={selectedExportRequest?.appliedFilters || []}
          exportRequestId={selectedExportRequest?.id}
        />
        <button onClick={() => setDialogOpen(false)}>Close</button>
      </dialog>
      <ExportNotesDialog
        open={notesDialogOpen}
        onClose={() => setNotesDialogOpen(false)}
        exportNotes={
          selectedExportRequestNotes ? selectedExportRequestNotes[0] : null
        }
      />
    </div>
  );
}
