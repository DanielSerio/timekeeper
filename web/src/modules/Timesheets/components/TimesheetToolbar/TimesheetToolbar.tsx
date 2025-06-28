import type { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import type {
  useViewTimesheetMode,
  ViewTimesheetMode,
} from "#timesheets/hooks/useViewTimesheetMode";
import { Button, Flex, Group, SegmentedControl } from "@mantine/core";
import { TbCancel, TbDeviceFloppy } from "react-icons/tb";

export function TimesheetToolbar({
  isLoading,
  editModeController: [isEditMode, { open, close }],
  viewTimesheetController: [viewMode, setViewMode],
}: {
  isLoading?: boolean;
  editModeController: ReturnType<typeof useTimesheetEditMode>;
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const onEditClick = () => open();
  const onCancelClick = () => close();
  const onSaveClick = () => close();

  return (
    <Flex
      className="timesheet-toolbar"
      align="center"
      justify="space-between"
      p="xs"
      h={48}
    >
      <Group>
        {!isEditMode ? (
          <Button
            disabled={isLoading}
            size="xs"
            rightSection={<TbDeviceFloppy />}
            onClick={onEditClick}
          >
            Edit
          </Button>
        ) : (
          <>
            <Button
              color="gray"
              size="xs"
              rightSection={<TbCancel />}
              onClick={onCancelClick}
            >
              Cancel
            </Button>
            <Button
              size="xs"
              rightSection={<TbDeviceFloppy />}
              onClick={onSaveClick}
            >
              Save
            </Button>
          </>
        )}
      </Group>
      {!isEditMode && (
        <SegmentedControl
          disabled={isLoading}
          size="xs"
          data={["By Time", "By Category"]}
          value={viewMode}
          onChange={(value) => setViewMode(value as ViewTimesheetMode)}
        />
      )}
    </Flex>
  );
}
