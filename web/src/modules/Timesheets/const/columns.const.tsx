import type { CustomColumnDef } from "#core/components/Table/types";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import {
  renderCreatedAtDate,
  renderLastUpdatedDate,
} from "#core/utilities/table/render-date";

export const TIMESHEET_COLUMNS: CustomColumnDef<TimesheetRecord>[] = [
  {
    id: "id",
    header: "ID",
    size: 64,
    align: "center",
    accessorKey: "id",
    accessorFn(row) {
      return row.id;
    },
  },
  {
    id: "name",
    header: "Name",
    size: 256,
    isActionColumn: true,
    accessorKey: "name",
    accessorFn(row) {
      return row.name;
    },
  },
  {
    id: "date",
    header: "Date",
    size: 192,
    isActionColumn: true,
    align: "right",
    accessorKey: "date",
    accessorFn: renderCreatedAtDate<TimesheetRecord, "date">("date"),
  },
  {
    id: "lastUpdatedAt",
    header: "Updated",
    size: 192,
    align: "right",
    accessorKey: "lastUpdatedAt",
    accessorFn: renderLastUpdatedDate<TimesheetRecord, "date">,
  },
];
