import { useEffect, useState } from "react";
import type { ExportDtoResponse } from "../types";
import { getAllExportRequests } from "../api/exportApi";
import "./ExportRequestDashboard.css";
import DashboardAppliedFiltersDialog from "./DashboardAppliedFiltersDialog";

export default function ExportRequestDashboard() {
    const [exportRequests, setExportRequests] = useState<ExportDtoResponse[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedExportRequest, setSelectedExportRequest] = useState<ExportDtoResponse>();

    useEffect(() => {
        const fetchExportRequests = async () => {
            try {
                const requests = await getAllExportRequests();
                setExportRequests(requests);
            } catch (error) {
                console.error("Error fetching export requests:", error);
            }
        };
        fetchExportRequests();
    }, []);

    useEffect(() => {
        console.log("Export Requests:", exportRequests);
    }, [exportRequests]);


    function createDateString(dateString: string): string {
        const date = new Date(dateString);

        const timeWithoutSeconds = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return date.toLocaleDateString() + " | " + timeWithoutSeconds;
    }

    return (
        <div id="dashboard-container">
            <h1>Export Activity</h1>
            <table id="dashboard-table">
                <thead id="dashboard-header">
                    <tr>
                        <th>Employee ID </th>
                        <th>Format</th>
                        <th>Creation</th>
                        <th>Entities</th>
                        <th>Filters</th>
                        <th>Filename</th>
                        <th>Status</th>
                        <th>Size (KB)</th>
                    </tr>
                </thead>
                <tbody id="dashboard-body">
                    {exportRequests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.employeeId}</td>
                            <td>{request.exportFormat}</td>
                            <td>{createDateString(request.exportCreation)}</td>
                            <td>{request.selectedEntities}</td>
                            <td>
                                <button onClick={
                                    () => {
                                        setSelectedExportRequest(request);
                                        setDialogOpen(true);
                                    }
                                }>
                                    ...
                                </button>
                            </td>
                            <td>{request.fileName}</td>
                            <td>{request.status}</td>
                            <td>{request.fileSize ?? "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <dialog open={dialogOpen} id="applied-filters-dialog">
                <DashboardAppliedFiltersDialog appliedFilters={selectedExportRequest?.appliedFilters || []} exportRequestId={selectedExportRequest?.id} />
                <button onClick={() => setDialogOpen(false)}>Close</button>
            </dialog>
        </div>
    );
}