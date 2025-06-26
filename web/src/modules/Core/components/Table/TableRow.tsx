import type { PropsWithChildren } from "react";
import { Box } from "@mantine/core";
import { classNames } from "#core/utilities/attribute";

export function TableRow({
  children,
  className,
  gridTemplateColumns,
}: PropsWithChildren<{ className?: string; gridTemplateColumns: string }>) {
  return (
    <Box
      className={classNames("table-row", className)}
      style={{ gridTemplateColumns }}
    >
      {children}
    </Box>
  );
}
