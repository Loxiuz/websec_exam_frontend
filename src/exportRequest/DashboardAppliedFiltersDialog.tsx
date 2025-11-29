import type { AppliedFilters } from "../types";
import "./DashboardAppliedFiltersDialog.css";


export default function DashboardAppliedFiltersDialog(props: { appliedFilters: AppliedFilters, exportRequestId?: number }) {
    const { appliedFilters, exportRequestId } = props;

    return (
        <div>
            <h2>Applied Filters (Export Request ID: {exportRequestId})</h2>
            <ul>
                {appliedFilters.map((filter, i) => {
                    const entity = Object.keys(filter)[0];
                    const field = filter[entity].field;
                    console.log("Entity:", entity, "Field:", field);
                    const value = filter[entity].value;
                    return (
                        <li key={entity + i} id="applied-filter-dialog-li">
                            <strong>Entity:</strong> {entity} | <strong>Field:</strong> {(field !== "" && (<span>{field}</span>)) || "Not specified"} | <strong>Value:</strong> {(value !== "" && (<span>{value}</span>)) || "Not specified"}
                        </li>
                    );
                })}
            </ul>
        </div>
    );




}