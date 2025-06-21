import { classNames } from "#core/utilities/attribute";
import { Box, type BoxProps } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function TableFooter({
  className,
  children,
  ...props
}: PropsWithChildren<BoxProps>) {
  return (
    <Box className={classNames("table-footer", className)} {...props}>
      {children}
    </Box>
  );
}
