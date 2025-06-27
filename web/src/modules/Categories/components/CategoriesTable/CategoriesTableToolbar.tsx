import { useCategoriesTable } from "#categories/hooks/useCategoriesTable";
import { Pagination } from "#core/components/Pagination/Pagination";
import { Button, Checkbox, Flex, Group, Switch, Text } from "@mantine/core";
import { TbPlus, TbTrash } from "react-icons/tb";

export function CategoriesTableToolbar() {
  const [
    {
      paging,
      totalRecords,
      isEditMode,
      allRowsSelected: allSelected,
      noRowsSelected: noneSelected,
    },
    {
      onChangeSelectionStateForAll,
      setIsEditMode,
      onCreateClick,
      onDeleteClick,
      pagingMethods,
    },
  ] = useCategoriesTable();

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
            <Group>
              <Button
                color="red"
                onClick={onDeleteClick}
                disabled={noneSelected}
                size="xs"
                title={"Remove Categories"}
              >
                <Group gap={4}>
                  <Text visibleFrom="sm" size="xs">
                    Remove Categories
                  </Text>
                  <TbTrash />
                </Group>
              </Button>
              <Button
                onClick={onCreateClick}
                size="xs"
                title={"Create Category"}
              >
                <Group gap={4}>
                  <Text visibleFrom="sm" size="xs">
                    Create Category
                  </Text>
                  <TbPlus />
                </Group>
              </Button>
            </Group>
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
