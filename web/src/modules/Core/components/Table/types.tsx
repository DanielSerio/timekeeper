import type { ListResponse } from "#core/types/response/app.response-types";
import type { UseQueryResult } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";

export type CustomColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
> & {
  size: number;
  id: string;
  header: string;
  isActionColumn?: boolean;
  align?: "left" | "center" | "right";
};

export interface UseTableProps<TData, TValue = unknown> {
  columns: CustomColumnDef<TData, TValue>[];
  query: UseQueryResult<ListResponse<TData>>;
}
