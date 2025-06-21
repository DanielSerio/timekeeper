import { classNames } from "#core/utilities/attribute";
import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function TableToolbar({
  className,
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <Box className={classNames("table-toolbar", className)} {...props}>
      {children}
    </Box>
  );
}
