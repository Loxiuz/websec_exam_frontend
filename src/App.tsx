import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./login/LoginPage";
import RequireAuth from "./auth/RequireAuth";
import UserPage from "./user/UserPage";

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
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <ExportPage />
              </RequireAuth>
            }
          />
          <Route
            path="import"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <h1>Import</h1>
              </RequireAuth>
            }
          />
          <Route
            path="flight-schedules"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <h1>Flight Schedules</h1>
              </RequireAuth>
            }
          />
          <Route
            path="cargo-tracking"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <h1>Cargo Tracking</h1>
              </RequireAuth>
            }
          />
          <Route
            path="warehouse"
            element={
              <RequireAuth allowedRoles={["ROLE_ADMIN"]}>
                <h1>Warehouse</h1>
              </RequireAuth>
            }
          />
          {/* TODO: wrap with RequireAuth */}
          <Route path="user" element={<UserPage />} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="unauthorized" element={<h1>Unauthorized</h1>} />
          <Route path="*" element={<Navigate to="export" />} />
          {/* TODO: add group page for users to communicate with threads and comments */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
