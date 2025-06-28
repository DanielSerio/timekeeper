import type { CustomColumnDef } from "#core/components/Table/types";
import type { CategoryRecord } from "#core/types/models/category.model-types";
import {
  renderCreatedAtDate,
  renderLastUpdatedDate,
} from "#core/utilities/table/render-date";

export const CATEGORY_COLUMNS: CustomColumnDef<CategoryRecord>[] = [
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
    id: "createdAt",
    header: "Created",
    size: 192,
    align: "right",
    accessorKey: "createdAt",
    accessorFn: renderCreatedAtDate<CategoryRecord>("createdAt"),
  },
  {
    id: "lastUpdatedAt",
    header: "Updated",
    size: 192,
    align: "right",
    accessorKey: "lastUpdatedAt",
    accessorFn: renderLastUpdatedDate<CategoryRecord>,
  },
];
