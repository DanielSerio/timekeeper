import type { PropsWithChildren } from "react";
import { Box } from "@mantine/core";

export function TableRow({
  children,
  gridTemplateColumns,
}: PropsWithChildren<{ gridTemplateColumns: string }>) {
  return <Box style={{ gridTemplateColumns }}>{children}</Box>;
}
