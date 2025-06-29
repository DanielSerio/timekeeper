import type { CustomColumnDef } from "#core/components/Table/types";
import { findColumn } from "./find-column";

export function isActionColumn<TData, TValue>(id: string, context: CustomColumnDef<TData, TValue>[]) {
  const foundColumn = findColumn(id, context);

  return foundColumn && foundColumn.isActionColumn;
}

