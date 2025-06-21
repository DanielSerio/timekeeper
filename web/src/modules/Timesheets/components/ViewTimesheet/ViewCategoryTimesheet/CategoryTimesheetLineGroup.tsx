import type { CategoryRecord } from "#core/types/models/category.model-types";
import { Badge, Box, Flex, Text } from "@mantine/core";
import { CategoryTimesheetLine } from "./CategoryTimesheetLine";
import type { PropsWithChildren } from "react";
import { TimeDisplayCell } from "#timesheets/components/Timesheet/cell/TimeDisplayCell";

export type CategoryTimesheetRowGroupProps = PropsWithChildren<{
  categoryId: number;
  categories?: CategoryRecord[];
  showHeader?: boolean;
  total: number;
  runningTotalMinutes: number;
}>;

export function CategoryTimesheetLineGroup({
  categories,
  categoryId,
  showHeader,
  runningTotalMinutes,
  total,
  children,
}: CategoryTimesheetRowGroupProps) {
  const category = (categories ?? []).find((cat) => cat.id === categoryId);

  return (
    <Flex direction="column">
      <Box className="line-header">
        {!!showHeader && (
          <CategoryTimesheetLine>
            <Box>Category</Box>
            <Box>Start Time</Box>
            <Box>End Time</Box>
            <Box>Group Time</Box>
            <Box>Total Time</Box>
          </CategoryTimesheetLine>
        )}
        <CategoryTimesheetLine>
          <Badge variant="light" color="gray" radius={0} h={"100%"}>
            {category?.name}
          </Badge>
          <Box className="span" />
          <Box>
            <Text c="#ffd43baa" style={{ fontSize: "inherit" }}>
              <TimeDisplayCell name="line-time" minutes={total} />
            </Text>
          </Box>
          <Box>
            <Text c="yellow" style={{ fontSize: "inherit" }}>
              <TimeDisplayCell
                name="total-time"
                minutes={runningTotalMinutes + total}
              />
            </Text>
          </Box>
        </CategoryTimesheetLine>
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
}
