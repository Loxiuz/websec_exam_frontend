import { useEffect, useState } from "react";
import "./UserPage.css";
import { getEmployeeImage, uploadImageToEmployee } from "../api/employeeApi";
import readSessionString from "../auth/ReadSessionString";
import {
  getExportNotesByExportRequestId,
  getExportRequestByEmployeeId,
} from "../api/exportApi";
import type { ExportDtoResponse, ExportNotes } from "../types";
import ExportRequestTable from "../exportRequest/ExportRequestTable";
import DashboardAppliedFiltersDialog from "../exportRequest/DashboardAppliedFiltersDialog";
import ExportNotesDialog from "../exportNotes/ExportNotesDialog";

export default function UserPage() {
  const [imageFormData, setImageFormData] = useState({
    image: null as File | null,
  });
  const employeeId = readSessionString("employeeId");
  const username = readSessionString("username");
  const roleRaw = readSessionString("role");
  const role = roleRaw.startsWith("ROLE_")
    ? roleRaw.split("ROLE_")[1]
    : roleRaw;
  const [exportRequests, setExportRequests] = useState<ExportDtoResponse[]>([]);
  const [selectedExportRequest, setSelectedExportRequest] =
    useState<ExportDtoResponse>();
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [selectedExportRequestNotes, setSelectedExportRequestNotes] =
    useState<ExportNotes[]>();

  useEffect(() => {
    const fetchEmployeeImage = async () => {
      if (!employeeId) {
        return;
      }

      try {
        const imageBlob = await getEmployeeImage(employeeId);
        const imageUrl = URL.createObjectURL(imageBlob);
        const imgElement = document.querySelector(
          "#img-container img",
        ) as HTMLImageElement;
        imgElement.src = imageUrl;
        imgElement.alt = "Employee Image";
      } catch (error) {
        console.error("Error fetching employee image:", error);
      }
    };
    fetchEmployeeImage();
  }, [employeeId]);

  useEffect(() => {
    const fetchExportRequestsByEmployeeId = async () => {
      if (!employeeId) {
        return;
      }
      try {
        const response = await getExportRequestByEmployeeId(employeeId);
        setExportRequests(response);
      } catch (error) {
        console.error("Error fetching export requests for employee:", error);
      }
    };
    fetchExportRequestsByEmployeeId();
  }, [employeeId]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (selectedExportRequest) {
        try {
          const response = await getExportNotesByExportRequestId(
            selectedExportRequest.id,
          );
          setSelectedExportRequestNotes(response);
        } catch (error) {
          console.error("Error fetching notes for export request:", error);
        }
      }
    };
    fetchNotes();
  }, [selectedExportRequest]);

  function handleFormChange(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.target.type === "file") {
      setImageFormData((prev) => ({
        ...prev,
        image: e.target.files ? e.target.files[0] : null,
      }));
    } else {
      setImageFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  }

  async function handleFormSubit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { image } = imageFormData;
    if (!employeeId || employeeId === "") {
      alert("Missing employee id for current user.");
      return;
    }

    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    await uploadImageToEmployee(employeeId, image);
    globalThis.location.reload();
  }

  return (
    <div id="user-page-container">
      <h1>User: {username}</h1>
      <p>Role: {role}</p>
      <div id="user-info-grid">
        <div id="img-container" className="user-info-item">
          <img src="" alt="" />
          <form
            id="edit-img-form"
            onSubmit={handleFormSubit}
            onChange={handleFormChange}
          >
            <input type="file" id="edit-img-input" name="image" />
            <input type="submit" id="edit-img-btn" value="Upload" />
          </form>
        </div>
        <div id="employee-id-container" className="user-info-item">
          <p>
            Employee ID:{" "}
            {employeeId && <span>{employeeId ? employeeId : "N/A"}</span>}
          </p>
        </div>
      </div>
      <h3>Export History</h3>
      <ExportRequestTable
        exportRequests={exportRequests}
        setSelectedExportRequest={setSelectedExportRequest}
        setDialogOpen={setFiltersDialogOpen}
        setNotesDialogOpen={setNotesDialogOpen}
      />
      <dialog open={filtersDialogOpen} id="applied-filters-dialog">
        <DashboardAppliedFiltersDialog
          appliedFilters={selectedExportRequest?.appliedFilters || []}
          exportRequestId={selectedExportRequest?.id}
        />
        <button onClick={() => setFiltersDialogOpen(false)}>Close</button>
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
