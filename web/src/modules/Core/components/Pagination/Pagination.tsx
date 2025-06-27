import {
  ActionIcon,
  Group,
  Popover,
  Select,
  Text,
  type ActionIconProps,
} from "@mantine/core";
import type { PropsWithChildren } from "react";
import {
  TbBook2,
  TbChevronLeft,
  TbChevronRight,
  TbChevronsLeft,
  TbChevronsRight,
} from "react-icons/tb";

function PaginationButton({
  children,
  ...props
}: PropsWithChildren<
  ActionIconProps & { title: string; onClick?: () => void }
>) {
  return (
    <ActionIcon variant="light" color="gray" {...props}>
      {children}
    </ActionIcon>
  );
}

export interface PaginationProps {
  totalRecords: number;
  limit: number;
  offset: number;
  pagingMethods: {
    goToFirst: () => void;
    goToLast: () => void;
    goToNext: () => void;
    goToPrev: () => void;
    changeRecordsPerPage: (perPage: number) => void;
  };
}

export function Pagination({
  totalRecords,
  limit,
  offset,
  pagingMethods: {
    changeRecordsPerPage,
    goToFirst,
    goToPrev,
    goToNext,
    goToLast,
  },
}: PaginationProps) {
  return (
    <Popover>
      <Popover.Target>
        <PaginationButton title="Pagination Settings">
          <TbBook2 />
        </PaginationButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          maw={175}
          label="Records per page"
          mb={"md"}
          data={["1", "5", "10", "25", "50", "100", "250"]}
          value={limit.toString()}
          onChange={(value) => {
            if (value !== null) {
              changeRecordsPerPage(+value);
            }
          }}
        />
        <Group gap="xs" w="fit-content" mx="auto">
          <PaginationButton title="Go to first page" onClick={goToFirst}>
            <TbChevronsLeft />
          </PaginationButton>
          <PaginationButton title="Go to previous page" onClick={goToPrev}>
            <TbChevronLeft />
          </PaginationButton>

          <Text>
            {Math.ceil(offset / limit)}/{Math.ceil(totalRecords / limit)}
          </Text>

          <PaginationButton title="Go to next page" onClick={goToNext}>
            <TbChevronRight />
          </PaginationButton>
          <PaginationButton title="Go to last page" onClick={goToLast}>
            <TbChevronsRight />
          </PaginationButton>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
