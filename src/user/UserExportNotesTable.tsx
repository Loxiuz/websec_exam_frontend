import { useEffect, useState } from "react";
import type { ExportNotes } from "../types";
import { getExportNotesbyEmployeeId } from "../api/exportApi";
import "./UserExportNotesTable.css";

export default function UserExportNotesTable({
  employeeId,
}: {
  employeeId: string;
}) {
  const [exportNotes, setExportNotes] = useState<ExportNotes[]>([]);

  useEffect(() => {
    const fetchExportNotes = async () => {
      const response = await getExportNotesbyEmployeeId(employeeId);
      if (!response) {
        console.error("Failed to fetch export notes");
        return;
      }
      setExportNotes(response);
    };
    fetchExportNotes();
  }, [employeeId]);

  return (
    <div id="user-export-notes-table-container">
      <table id="user-export-notes-table">
        <thead id="user-export-notes-header">
          <tr>
            <th>ID</th>
            <th>Export Request ID</th>
            <th>Creation Date</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody id="user-export-notes-body">
          {exportNotes.map((note) => (
            <tr key={note.id}>
              <td>{note.id}</td>
              <td>{note.exportRequestId}</td>
              <td>{note.creationDate}</td>
              <td>{note.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
