import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./login/LoginPage";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
            <Layout />
          </RequireAuth>
        }>
          <Route path="export" element={<ExportPage />} />
          <Route path="import" element={<h1>Import</h1>} />
          <Route path="flight-schedules" element={<h1>Flight Schedules</h1>} />
          <Route path="cargo-tracking" element={<h1>Cargo Tracking</h1>} />
          <Route path="warehouse" element={<h1>Warehouse</h1>} />
          <Route path="user" element={<h1>User</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="unauthorized" element={<h1>Unauthorized</h1>} />
          <Route path="*" element={<Navigate to="export" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
