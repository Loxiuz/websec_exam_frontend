import { useEffect, useMemo, useState } from "react";
import type { ExportNotes, IsHiddenDto } from "../types";
import {
  getAllExportNotes,
  isExportNotesHidden,
  setExportNotesHidden,
} from "../api/exportApi";
import "./ExportNotesPage.css";
import ExportNotesDialog from "./ExportNotesDialog";
import createDateString from "../utils/utils.tsx";

export default function ExportNotesPage() {
  const [exportNotes, setExportNotes] = useState<ExportNotes[]>([]);
  const [onlyMyNotes, setOnlyMyNotes] = useState(false);
  const [hiddenByNoteId, setHiddenByNoteId] = useState<Record<string, boolean>>(
    {},
  );
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedExportRequestNotes, setSelectedExportRequestNotes] =
    useState<ExportNotes | null>(null);
  const employeeId = sessionStorage.getItem("employeeId") || "";

  useEffect(() => {
    const fetchExportNotes = async () => {
      const response = await getAllExportNotes();
      setExportNotes(response);
    };
    fetchExportNotes();
  }, []);

  async function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    const noteId = e.target.dataset.noteId;
    if (!noteId) {
      return;
    }

    const isHidden = e.target.value === "hide";
    setHiddenByNoteId((previous) => ({ ...previous, [noteId]: isHidden }));

    try {
      await setExportNotesHidden(noteId, isHidden);
    } catch (error) {
      console.error("Error updating hidden status for note:", error);
      setHiddenByNoteId((previous) => ({ ...previous, [noteId]: !isHidden }));
    }
  }

  async function isNoteHidden(noteId: string): Promise<IsHiddenDto> {
    try {
      const hiddenStatus = await isExportNotesHidden(noteId);
      return hiddenStatus;
    } catch (error) {
      console.error("Error fetching hidden status for note:", error);
      return { isHidden: false };
    }
  }

  const visibleExportNotes = useMemo(
    () =>
      onlyMyNotes
        ? exportNotes.filter((notes) => notes.employeeId === employeeId)
        : exportNotes,
    [onlyMyNotes, exportNotes, employeeId],
  );

  useEffect(() => {
    if (!onlyMyNotes) {
      return;
    }

    let isMounted = true;

    async function fetchHiddenStatusForVisibleNotes() {
      const hiddenEntries = await Promise.all(
        visibleExportNotes.map(async (note) => {
          if (!note.id) {
            return null;
          }

          const isHidden = await isNoteHidden(note.id);
          return [note.id, isHidden] as const;
        }),
      );

      const hiddenEntriesWithoutNull = hiddenEntries.filter(
        (entry): entry is readonly [string, IsHiddenDto] => entry !== null,
      );

      if (!isMounted) {
        return;
      }

      setHiddenByNoteId((previous) => ({
        ...previous,
        ...Object.fromEntries(
          hiddenEntriesWithoutNull.map(([noteId, isHiddenDto]) => [
            noteId,
            isHiddenDto.isHidden,
          ]),
        ),
      }));
    }

    fetchHiddenStatusForVisibleNotes();

    return () => {
      isMounted = false;
    };
  }, [onlyMyNotes, visibleExportNotes]);

  return (
    <div>
      <h1>Export Notes</h1>
      <label className="export-notes-filter">
        <input
          type="checkbox"
          checked={onlyMyNotes}
          onChange={(e) => setOnlyMyNotes(e.target.checked)}
        />
        Show only notes from my employee ID
      </label>
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
              {onlyMyNotes && <th>Hide</th>}
            </tr>
          </thead>
          <tbody id="export-notes-body">
            {visibleExportNotes.map((notes, index) => {
              const noteId = notes.id;

              return (
                <tr
                  key={noteId ?? `${notes.exportRequestId ?? "note"}-${index}`}
                >
                  <td>{notes.id?.split("-")[0]}</td>
                  <td>{notes.exportRequestId?.split("-")[0]}</td>
                  <td>{notes.employeeId?.split("-")[0]}</td>
                  <td>{createDateString(notes.creationDate)}</td>
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
                  {onlyMyNotes && (
                    <td>
                      <label>visible</label>
                      <input
                        type="radio"
                        name={`visibility-${noteId ?? "missing-id"}`}
                        value="show"
                        data-note-id={noteId ?? undefined}
                        checked={
                          noteId ? hiddenByNoteId[noteId] === false : false
                        }
                        disabled={!noteId}
                        onChange={handleRadioChange}
                      />
                      <label>hidden</label>
                      <input
                        type="radio"
                        name={`visibility-${noteId ?? "missing-id"}`}
                        value="hide"
                        data-note-id={noteId ?? undefined}
                        checked={
                          noteId ? hiddenByNoteId[noteId] === true : false
                        }
                        disabled={!noteId}
                        onChange={handleRadioChange}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
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
