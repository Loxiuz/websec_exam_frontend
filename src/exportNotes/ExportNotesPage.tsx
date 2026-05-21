import { useEffect, useState } from "react";
import type { ExportNotes } from "../types";
import { getAllExportNotes } from "../api/exportApi";

export default function ExportNotesPage() {
  const [exportNotes, setExportNotes] = useState<ExportNotes[]>([]);

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
      {exportNotes.map((note) => (
        <div key={note.id}>
          <p>Export Request ID: {note.exportRequestId}</p>
          <p>Employee ID: {note.employeeId}</p>
          <p>Notes: {note.notes}</p>
        </div>
      ))}
    </div>
  );
}
