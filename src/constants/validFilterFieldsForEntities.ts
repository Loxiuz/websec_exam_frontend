import type { ValidExportFilterFields } from "../types";

export const VALID_EXPORT_FILTER_FIELDS: ValidExportFilterFields[] = [
  {
    entity: "flight",
    validFilterFields: ["flightNumber", "departureTime", "arrivalTime"],
  },
  { entity: "passenger", validFilterFields: [] },
  {entity: "crew_member", validFilterFields: ["id", "name", "email"] },
  { entity: "crew_member_assignment", validFilterFields: ["crewMemberId", "role", "flightNumber"] },
  {
    entity: "booking",
    validFilterFields: [ "passengerId", "flightNumber", "bookingNumber", "seatNumber", "status" ],
  },
];
