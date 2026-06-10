import { useEffect, useState } from "react";
import type { ExportNoteRequest, ExportNotes } from "../types";
import "./ExportNotesDialog.css";
import {
  createExportNotes,
  getExportNotesByExportRequestId,
} from "../api/exportApi";
import RequireAuth from "../auth/RequireAuth";

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
  const [addNoteForm, setAddNoteForm] = useState<ExportNoteRequest>({
    exportRequestId: "",
    employeeId: "",
    notes: "",
  });
  const [addNoteFormOpen, setAddNoteFormOpen] = useState(false);

  useEffect(() => {
    async function fetchNotesFromRequest() {
      const requestId = exportNotes?.exportRequestId;
      if (!requestId) {
        setNotesFromRequest([]);
        return;
      }

      try {
        const response = await getExportNotesByExportRequestId(requestId);
        setNotesFromRequest(response?.length ? response : []);
        setAddNoteForm((previousForm) => ({
          ...previousForm,
          exportRequestId: requestId,
          employeeId: exportNotes?.employeeId || "",
        }));
      } catch (error) {
        console.error("Error fetching notes for export request:", error);
      }
    }
    fetchNotesFromRequest();
  }, [exportNotes]);

  function renderNoteForm() {
    return (
      <div id="add-note-form-container">
        <h3>Add Note</h3>
        <form id="add-note-form">
          <textarea
            id="add-note-textarea"
            name="note"
            value={addNoteForm.notes}
            onChange={(e) =>
              setAddNoteForm({ ...addNoteForm, notes: e.target.value })
            }
          ></textarea>
          <button onClick={handleExportNotesSubmit}>Submit</button>
        </form>
      </div>
    );
  }

  async function handleExportNotesSubmit(
    e: React.MouseEvent<HTMLButtonElement>,
  ) {
    e.preventDefault();
    if (!addNoteForm.notes.trim()) {
      alert("Note cannot be empty!");
      return;
    }

    const response = await createExportNotes(addNoteForm);
    if (response) {
      alert(`Note ${response} added successfully!`);
      setAddNoteFormOpen(false);
      globalThis.location.reload();
    }
  }

  return (
    <dialog open={open} id="export-notes-dialog">
      <div id="export-notes-container">
        <h3>Notes for Request: {exportNotes?.exportRequestId || "N/A"}</h3>
        <table id="export-notes-dialog-table">
          <thead id="export-notes-dialog-header">
            <tr>
              <th>Employee</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody id="export-notes-dialog-body">
            {notesFromRequest.map((notes) => {
              return (
                <tr key={notes.id}>
                  <td>{notes.employeeId}</td>
                  <td>{notes.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <RequireAuth permission="CREATE_NOTES" redirectOnDeny={false}>
          <button
            onClick={() => {
              setAddNoteFormOpen(true);
            }}
          >
            Add
          </button>
        </RequireAuth>
      </div>
      <RequireAuth permission="CREATE_NOTES" redirectOnDeny={false}>
        {addNoteFormOpen && renderNoteForm()}
      </RequireAuth>
      <button
        onClick={() => {
          onClose();
          setAddNoteForm({ ...addNoteForm, notes: "" });
          setAddNoteFormOpen(false);
        }}
      >
        Close
      </button>
    </dialog>
  );
}
