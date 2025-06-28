import { Button, Checkbox, Flex, Group, Switch, Text } from "@mantine/core";
import { TbPlus, TbTrash } from "react-icons/tb";
import { Pagination } from "#core/components/Pagination/Pagination";
import { useTimesheetsTable } from "#timesheets/hooks/useTimesheetsTable";

export function TimesheetsTableToolbar() {
  const [
    {
      isEditMode,
      totalRecords,
      paging,
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
    },
    {
      setIsEditMode,
      onCreateClick,
      onDeleteClick,
      onChangeSelectionStateForAll,
      pagingMethods,
    },
  ] = useTimesheetsTable();

  return (
    <Flex
      className="table-toolbar"
      p="xs"
      align="center"
      justify="space-between"
    >
      <Group>
        <Pagination
          totalRecords={totalRecords}
          limit={paging.limit}
          offset={paging.offset}
          pagingMethods={pagingMethods}
        />
      </Group>
      <Group>
        {isEditMode && (
          <>
            <Checkbox
              label="Select All"
              hiddenFrom="sm"
              size="xs"
              checked={allSelected}
              indeterminate={!allSelected && !noneSelected}
              onChange={(ev) =>
                onChangeSelectionStateForAll(ev.currentTarget.checked)
              }
            />
            <Button
              color="red"
              onClick={onDeleteClick}
              disabled={noneSelected}
              size="xs"
              title={"Remove Timesheets"}
            >
              <Group gap={4}>
                <Text visibleFrom="sm" size="xs">
                  Remove Timesheets
                </Text>
                <TbTrash />
              </Group>
            </Button>
            <Button onClick={onCreateClick} size="xs" title="Create Timesheet">
              <Group gap={4}>
                <Text size="xs" visibleFrom="sm">
                  Create Timesheet
                </Text>
                <TbPlus />
              </Group>
            </Button>
          </>
        )}
        <Switch
          label="Edit Mode"
          checked={isEditMode}
          onChange={(ev) => setIsEditMode(ev.target.checked)}
        />
      </Group>
    </Flex>
  );
}
