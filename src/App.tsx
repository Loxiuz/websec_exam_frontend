import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ExportPage from "./export/ExportPage";
import Layout from "./layout/Layout";
import LoginPage from "./login/LoginPage";
import UserPage from "./user/UserPage";
import ExportNotesPage from "./exportNotes/ExportNotesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="export" element={<ExportPage />} />
          <Route path="export-notes" element={<ExportNotesPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="unauthorized" element={<h1>Unauthorized</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
