import ExportRequestDashboard from "../exportRequest/ExportRequestDashboard";
import ExportForm from "./ExportForm";

export default function ExportPage() {
  return (
    <div id="export-page-container">
      <ExportRequestDashboard />
      <ExportForm />
    </div>
  );
}
