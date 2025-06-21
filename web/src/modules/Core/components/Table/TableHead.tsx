import type { PropsWithChildren } from "react";
import { TableSection } from "./TableSection";

export function TableHead({
  children,
  gridTemplateColumns,
}: PropsWithChildren<{ gridTemplateColumns: string }>) {
  return (
    <TableSection component="head" gridTemplateColumns={gridTemplateColumns}>
      {children}
    </TableSection>
  );
}
