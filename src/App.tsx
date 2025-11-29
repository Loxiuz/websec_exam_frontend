import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./login/LoginPage";
import { useState } from "react";

function LoginWrapper({ onLogin }: { onLogin: (employeeId: string) => void }) {
  const navigate = useNavigate();
  function handleLogin(employeeId: string) {
    onLogin(employeeId);
    navigate(`/${employeeId}/export`);
  }
  return <LoginPage onLogin={handleLogin} />;
}

function App() {
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  return (
    <BrowserRouter>
      {!employeeId ? (
        <Routes>
          <Route path="*" element={<LoginWrapper onLogin={setEmployeeId} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to={`/${employeeId}/export`} />} />
          <Route
            path="/:employeeId/*"
            element={
              <Layout>
                <Routes>
                  <Route path="export" element={<ExportPage />} />
                  <Route path="import" element={<h1>Import</h1>} />
                  <Route
                    path="flight-schedules"
                    element={<h1>Flight Schedules</h1>}
                  />
                  <Route
                    path="cargo-tracking"
                    element={<h1>Cargo Tracking</h1>}
                  />
                  <Route path="warehouse" element={<h1>Warehouse</h1>} />
                  <Route path="users" element={<h1>Users</h1>} />
                  <Route path="settings" element={<h1>Settings</h1>} />
                  <Route path="*" element={<Navigate to="export" />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
