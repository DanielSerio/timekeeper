import { classNames } from "#core/utilities/attribute";
import { Box, Flex, Skeleton, Text } from "@mantine/core";
import type { PropsWithChildren } from "react";

export interface SkeletonTimesheetRowProps {
  variant?: "time" | "category";
}

interface SkeletonTimesheetRowsPropsBase extends SkeletonTimesheetRowProps {
  variant?: "time" | "category";
  count: number;
  countPerGroup?: number;
}
interface TimeSkeletonTimesheetRowsProps
  extends SkeletonTimesheetRowsPropsBase {
  variant?: "time";
  countPerGroup?: never;
}
interface CategorySkeletonTimesheetRowsProps
  extends SkeletonTimesheetRowsPropsBase {
  variant: "category";
  countPerGroup: number;
}

export type SkeletonTimesheetRowsProps =
  | CategorySkeletonTimesheetRowsProps
  | TimeSkeletonTimesheetRowsProps;

function SkeletonTimesheetLine({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <Box className={classNames("line", className)}>{children}</Box>;
}

function TimeSkeletonTimesheetRow({ note }: { note?: boolean }) {
  return (
    <>
      {!!note && (
        <SkeletonTimesheetLine className="note-line">
          <Skeleton w="35ch" h={18} mt={3} />
        </SkeletonTimesheetLine>
      )}
      <SkeletonTimesheetLine>
        <Skeleton w="20ch" h={"100%"} />
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
      </SkeletonTimesheetLine>
    </>
  );
}
function CategorySkeletonTimesheetRow({ note }: { note?: boolean }) {
  return (
    <>
      {!!note && (
        <SkeletonTimesheetLine className="note-line">
          <Skeleton w="35ch" h={18} mt={3} />
        </SkeletonTimesheetLine>
      )}
      <SkeletonTimesheetLine>
        <Skeleton w="20ch" h={"100%"} />
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
        <Text style={{ fontSize: "inherit" }}>
          <Skeleton mt={3} w="7ch" h={18} />
        </Text>
      </SkeletonTimesheetLine>
    </>
  );
}

function SkeletonTimesheetRowGroup({ children }: PropsWithChildren) {
  return (
    <Flex direction="column">
      <Box className="line-header">
        <SkeletonTimesheetLine>
          <Skeleton w="20ch" h={"100%"} />
          <Box className="span" />
          <Box>
            <Text style={{ fontSize: "inherit" }}>
              <Skeleton mt={3} w="7ch" h={18} />
            </Text>
          </Box>
          <Box>
            <Text style={{ fontSize: "inherit" }}>
              <Skeleton mt={3} w="7ch" h={18} />
            </Text>
          </Box>
        </SkeletonTimesheetLine>
      </Box>
      <Box>{children}</Box>
    </Flex>
  );
}

function rangeArray(count: number, startAt: number = 0) {
  return [...new Array(count)].map((_, i) => i + startAt);
}

export function SkeletonTimesheetRows({
  variant,
  count,
  countPerGroup,
}: SkeletonTimesheetRowsProps) {
  if (variant === "category") {
    const groups = rangeArray(count, 1);

    return (
      <>
        {groups.map((v) => {
          const groupRows = rangeArray(countPerGroup);

          return (
            <SkeletonTimesheetRowGroup key={v}>
              {groupRows.map((t) => (
                <CategorySkeletonTimesheetRow
                  key={`${v}:${t}`}
                  note={t % 2 === 0}
                />
              ))}
            </SkeletonTimesheetRowGroup>
          );
        })}
      </>
    );
  }

  const rows = rangeArray(count);

  return (
    <>
      {rows.map((v) => (
        <TimeSkeletonTimesheetRow key={`time:${v}`} note={v % 2 === 0} />
      ))}
    </>
  );
}
