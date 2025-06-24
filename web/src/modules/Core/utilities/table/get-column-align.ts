import type { CustomColumnDef } from "#core/components/Table/types";
import { findColumn } from "./find-column";

export function getColumnAlign<TData, TValue>(id: string, context: CustomColumnDef<TData, TValue>[]) {
  const foundColumn = findColumn(id, context);

  return foundColumn?.align ?? null;
}