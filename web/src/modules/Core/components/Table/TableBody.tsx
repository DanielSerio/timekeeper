import type { PropsWithChildren } from "react";
import { TableSection } from "./TableSection";

export function TableBody({ children }: PropsWithChildren) {
  return <TableSection component="body">{children}</TableSection>;
}
