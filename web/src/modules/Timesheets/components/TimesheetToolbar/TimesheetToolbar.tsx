import type { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import type {
  useViewTimesheetMode,
  ViewTimesheetMode,
} from "#timesheets/hooks/useViewTimesheetMode";
import { Flex, SegmentedControl, Switch } from "@mantine/core";

export function TimesheetToolbar({
  isLoading,
  editModeController: [isEditMode, { open, close }],
  viewTimesheetController: [viewMode, setViewMode],
}: {
  isLoading?: boolean;
  editModeController: ReturnType<typeof useTimesheetEditMode>;
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  return (
    <Flex
      className="timesheet-toolbar"
      align="center"
      justify="space-between"
      p="xs"
      h={48}
    >
      <Switch
        label="Edit Mode"
        checked={isEditMode}
        disabled={isLoading}
        onChange={(ev) => {
          if (ev.currentTarget.checked) {
            open();
          } else {
            close();
          }
        }}
      />
      {!isEditMode && (
        <SegmentedControl
          size="xs"
          data={["By Time", "By Category"]}
          value={viewMode}
          onChange={(value) => setViewMode(value as ViewTimesheetMode)}
        />
      )}
    </Flex>
  );
}
