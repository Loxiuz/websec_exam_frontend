import React, { useEffect, useState } from "react";
import "./UserPage.css";
import { getEmployeeImage, uploadImageToEmployee } from "../api/employeeApi";
export default function UserPage() {
  const [formData, setFormData] = useState({
    image: null as File | null,
    employeeId: "",
    username: "",
  });

  useEffect(() => {
    const fetchEmployeeImage = async () => {
      try {
        const imageBlob = await getEmployeeImage(formData?.employeeId);
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
  }, [formData.employeeId]);

  function handleFormChange(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (e.target.type === "file") {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files ? e.target.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  }

  async function handleFormSubit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { image, employeeId } = formData;
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    await uploadImageToEmployee(employeeId, image);
    globalThis.location.reload();
  }

  return (
    <div id="user-page-container">
      <h1>User Page</h1>
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
            {formData.employeeId && <span>{formData.employeeId}</span>}
          </p>
        </div>
        {/* TODD: Add full name with element with option to hide for other users but not for admin. Or change visibility on a settings page */}
        <div id="username-container" className="user-info-item">
          <p>
            Username: {formData.username && <span>{formData.username}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
