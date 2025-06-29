import { CancellableSaveButton } from "#core/components/buttons/CancellableSaveButton";
import { useSaveTimesheet } from "#timesheets/hooks/useSaveTimesheet";
import type { useTimesheetEditMode } from "#timesheets/hooks/useTimesheetEditMode";
import type {
  useViewTimesheetMode,
  ViewTimesheetMode,
} from "#timesheets/hooks/useViewTimesheetMode";
import { useTimesheetContext } from "#timesheets/providers/timesheet/timesheet.provider";
import { Flex, Group, SegmentedControl } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TbCancel, TbDeviceFloppy, TbEdit } from "react-icons/tb";

export function TimesheetToolbar({
  isLoading,
  editModeController: [isEditMode, { open, close }],
  viewTimesheetController: [viewMode, setViewMode],
}: {
  isLoading?: boolean;
  editModeController: ReturnType<typeof useTimesheetEditMode>;
  viewTimesheetController: ReturnType<typeof useViewTimesheetMode>;
}) {
  const [state, { reset }] = useTimesheetContext();
  const saveMutation = useSaveTimesheet(state.timesheetId, {
    onSuccess() {
      notifications.show({
        color: "green",
        title: "Success",
        message: "Successfully saved timesheet",
      });

      close();
    },
    onError(error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: error.message,
      });

      close();
    },
  });

  const onEditClick = () => open();
  const onCancelClick = () => {
    reset();
    close();
  };
  const onSaveClick = async () =>
    await saveMutation.mutateAsync({
      name: state.name,
      lines: state.lines,
      deleteLines: state.deleteLines,
    });

  return (
    <Flex
      className="timesheet-toolbar"
      align="center"
      justify="space-between"
      p="xs"
      h={48}
    >
      <Group>
        <CancellableSaveButton
          isEditMode={isEditMode}
          isBusy={isLoading || saveMutation.isPending}
          edit={{
            onClick: onEditClick,
            icon: <TbEdit />,
          }}
          save={{
            onClick: onSaveClick,
            icon: <TbDeviceFloppy />,
          }}
          cancel={{
            onClick: onCancelClick,
            icon: <TbCancel />,
          }}
        />
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
