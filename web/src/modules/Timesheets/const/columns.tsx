import type { CustomColumnDef } from "#core/components/Table/types";
import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import { Box } from "@mantine/core";
import { format } from "date-fns";

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
    accessorFn(row) {
      return format(row.date, "yyyy/MM/dd");
    },
  },
  {
    id: "lastUpdatedAt",
    header: "Updated",
    size: 192,
    align: "right",
    accessorKey: "lastUpdatedAt",
    accessorFn(row) {
      const updateDate = row.lastUpdatedAt;

      if (!updateDate) {
        return <Box className="muted">--</Box>;
      }

      return format(updateDate, "yyyy/MM/dd");
    },
  },
];
