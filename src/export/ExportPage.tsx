import RequireAuth from "../auth/RequireAuth";
import ExportRequestDashboard from "../exportRequest/ExportRequestDashboard";
import ExportForm from "./ExportForm";

export default function ExportPage() {
  return (
    <div id="export-page-container">
      <ExportRequestDashboard />
      <RequireAuth permission="CREATE_EXPORT" redirectOnDeny={false}>
        <ExportForm />
      </RequireAuth>
    </div>
  );
}
