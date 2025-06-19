import { Box } from "@mantine/core";
import { type PropsWithChildren } from "react";

export function TimesheetCell({
  children,
  name,
}: PropsWithChildren<{ name: string }>) {
  return (
    <Box p={3} className={`cell ${name}`}>
      {children}
    </Box>
  );
}
