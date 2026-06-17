import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./auth/LoginPage";
import UserPage from "./user/UserPage";
import ExportNotesPage from "./exportNotes/ExportNotesPage";
import RegisterPage from "./auth/RegisterPage";
import RequireAuth from "./auth/RequireAuth";
import UserManagementPage from "./userManagement/UserManagementPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            path="export"
            element={
              <RequireAuth permission="VIEW_EXPORTS">
                <ExportPage />
              </RequireAuth>
            }
          />
          <Route
            path="export-notes"
            element={
              <RequireAuth permission="VIEW_NOTES">
                <ExportNotesPage />
              </RequireAuth>
            }
          />
          <Route
            path="user"
            element={
              <RequireAuth>
                <UserPage />
              </RequireAuth>
            }
          />
          <Route
            path="manage-users"
            element={
              <RequireAuth permission="MANAGE_USERS">
                <UserManagementPage />
              </RequireAuth>
            }
          />
          <Route path="unauthorized" element={<h1>Unauthorized</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
