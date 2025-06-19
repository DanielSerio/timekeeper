import type { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import type {
  useViewTimesheetMode,
  ViewTimesheetMode,
} from "#timesheets/hooks/useViewTimesheetMode";
import { Flex, SegmentedControl, Switch } from "@mantine/core";

export function TimesheetToolbar({
  editModeController: [isEditMode, { open, close }],
  viewTimesheetController: [viewMode, setViewMode],
}: {
  editModeController: ReturnType<typeof useTimesheetEditMode>;
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  return (
    <Flex align="center" justify="space-between" p="xs">
      <Switch
        label="Edit Mode"
        checked={isEditMode}
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
          data={["By Time", "By Category"]}
          value={viewMode}
          onChange={(value) => setViewMode(value as ViewTimesheetMode)}
        />
      )}
    </Flex>
  );
}
