import { useEffect, useState } from "react";
import type { ExportNotes } from "../types";
import { getAllExportNotes } from "../api/exportApi";
import "./ExportNotesPage.css";
import ExportNotesDialog from "./ExportNotesDialog";

export default function ExportNotesPage() {
  const [exportNotes, setExportNotes] = useState<ExportNotes[]>([]);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedExportRequestNotes, setSelectedExportRequestNotes] =
    useState<ExportNotes | null>(null);

  useEffect(() => {
    const fetchExportNotes = async () => {
      const response = await getAllExportNotes();
      setExportNotes(response);
    };
    fetchExportNotes();
  }, []);

  return (
    <div>
      <h1>Export Notes</h1>
      <div id="export-notes-container">
        <table id="export-notes-table">
          <thead id="export-notes-header">
            <tr>
              <th>ID</th>
              <th>Export Request ID</th>
              <th>Employee ID</th>
              <th>Creation Date</th>
              <th>Notes</th>
              <th>All Notes</th>
            </tr>
          </thead>
          <tbody id="export-notes-body">
            {exportNotes.map((notes) => (
              <tr key={notes.id}>
                <td>{notes.id}</td>
                <td>{notes.exportRequestId}</td>
                <td>{notes.employeeId}</td>
                <td>{notes.creationDate}</td>
                <td>{notes.notes}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedExportRequestNotes(notes);
                      setNotesDialogOpen(true);
                    }}
                  >
                    . . .
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ExportNotesDialog
          open={notesDialogOpen}
          onClose={() => setNotesDialogOpen(false)}
          exportNotes={selectedExportRequestNotes}
        />
      </div>
    </div>
  );
}
