import { useEffect, useState } from "react";
import type { ExportNotes } from "../types";
import "./ExportNotesDialog.css";
import { getExportNotesByExportRequestId } from "../api/exportApi";

export default function ExportNotesDialog({
  open,
  onClose,
  exportNotes,
}: {
  open: boolean;
  onClose: () => void;
  exportNotes: ExportNotes | null;
}) {
  const [notesFromRequest, setNotesFromRequest] = useState<ExportNotes[]>([]);

  useEffect(() => {
    async function fetchNotesFromRequest() {
      const requestId = exportNotes?.exportRequestId;
      if (requestId) {
        const response = await getExportNotesByExportRequestId(requestId);
        setNotesFromRequest(response);
      }
    }
    fetchNotesFromRequest();
  }, [exportNotes, setNotesFromRequest]);

  return (
    <dialog open={open} id="export-notes-dialog">
      <div id="export-notes-container">
        <table id="export-notes-dialog-table">
          <thead id="export-notes-dialog-header">
            <tr>
              <th>
                Notes for Request: {exportNotes?.exportRequestId || "N/A"}
              </th>
            </tr>
          </thead>
          <tbody id="export-notes-dialog-body">
            {notesFromRequest.map((notes) => {
              return (
                <tr key={notes.id}>
                  <td>{notes.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
