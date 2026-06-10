import { useEffect, useState } from "react";
import type { ExportDtoResponse, ExportNotes } from "../types";
import {
  getAllExportRequests,
  getExportNotesByExportRequestId,
} from "../api/exportApi";
import "./ExportRequestDashboard.css";
import DashboardAppliedFiltersDialog from "./DashboardAppliedFiltersDialog";
import ExportNotesDialog from "../exportNotes/ExportNotesDialog";
import ExportRequestTable from "./ExportRequestTable";

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

  return (
    <div id="dashboard-container">
      <h1>Export Activity</h1>
      <ExportRequestTable
        exportRequests={exportRequests}
        setSelectedExportRequest={setSelectedExportRequest}
        setDialogOpen={setDialogOpen}
        setNotesDialogOpen={setNotesDialogOpen}
      />

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
