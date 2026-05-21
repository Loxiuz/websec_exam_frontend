import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./login/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import UserPage from "./user/UserPage";
import ExportNotesPage from "./exportNotes/ExportNotesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            path="export"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <ExportPage />
              </RequireAuth>
            }
          />
          <Route
            path="export-notes"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <ExportNotesPage />
              </RequireAuth>
            }
          />
          <Route
            path="user"
            element={
              <RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                <UserPage />
              </RequireAuth>
            }
          />
          <Route
            path="settings"
            element={
              <RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
                <h1>Settings</h1>
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
