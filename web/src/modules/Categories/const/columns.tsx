import type { CustomColumnDef } from "#core/components/Table/types";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import { Box } from "@mantine/core";
import { format } from "date-fns";

export const CATEGORY_COLUMNS: CustomColumnDef<CategoryRecord>[] = [
  {
    id: "id",
    header: "ID",
    size: 64,
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
    id: "createdAt",
    header: "Created",
    size: 192,
    accessorKey: "createdAt",
    accessorFn(row) {
      return format(row.createdAt, "yyyy/MM/dd");
    },
  },
  {
    id: "lastUpdatedAt",
    header: "Updated",
    size: 192,
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
