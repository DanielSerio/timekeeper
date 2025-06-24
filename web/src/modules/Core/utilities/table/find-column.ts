import type { CustomColumnDef } from "#core/components/Table/types";

export function findColumn<TData, TValue>(id: string, context: CustomColumnDef<TData, TValue>[]) {
  const foundColumn = context.find((col) => col.id === id);

  return foundColumn ?? null;
}