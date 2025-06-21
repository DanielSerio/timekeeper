import { classNames } from "#core/utilities/attribute";
import { Box } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function CategoryTimesheetLine({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const classes = classNames("line", className);
  return <Box className={classes}>{children}</Box>;
}
