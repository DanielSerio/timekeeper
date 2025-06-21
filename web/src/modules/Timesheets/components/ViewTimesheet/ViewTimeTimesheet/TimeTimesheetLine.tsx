import { classNames } from "#core/utilities/attribute";
import { Box } from "@mantine/core";
import type { PropsWithChildren } from "react";

export function TimeTimesheetLine({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return <Box className={classNames("line", className)}>{children}</Box>;
}
