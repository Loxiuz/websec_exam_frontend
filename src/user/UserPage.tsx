import { useEffect, useState } from "react";
import "./UserPage.css";
import { getEmployeeImage, uploadImageToEmployee } from "../api/employeeApi";
import UserExportNotesTable from "./UserExportNotesTable";
import readSessionString from "../auth/ReadSessionString";

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
      <h3>Export Notes</h3>
      <UserExportNotesTable employeeId={employeeId} />
    </div>
  );
}
