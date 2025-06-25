import type { TimesheetRecord } from "#core/types/models/timesheet.model-types";
import { useState } from "react";
interface TimesheetListModalStateObject {
  launched?: Date;
  timesheet?: TimesheetRecord;
}

interface OpenEditModalProps extends TimesheetListModalStateObject {
  timesheet: TimesheetRecord;
  launched?: never;
}

interface OpenCreateModalProps extends TimesheetListModalStateObject {
  launched?: never;
  timesheet?: never;
}

interface CreateModalState extends TimesheetListModalStateObject {
  launched: Date;
  timesheet?: never;
}

interface EditModalState extends TimesheetListModalStateObject {
  launched?: never;
  timesheet: TimesheetRecord;
}

export type TimesheetListModalState = CreateModalState | EditModalState;

export type OpenTimesheetListModalProps =
  | OpenCreateModalProps
  | OpenEditModalProps;

interface TimesheetListModalMethods {
  open: (props?: OpenTimesheetListModalProps) => void;
  dismiss: () => void;
}

function isEditModalState(obj: object): obj is CreateModalState {
  return "timesheet" in obj && !("launched" in obj);
}

export function useTimesheetListModal() {
  const [modalState, setModalState] = useState<TimesheetListModalState | null>(
    null
  );

  const methods: TimesheetListModalMethods = {
    open: (props?: OpenTimesheetListModalProps) => {
      if (!props || !isEditModalState(props)) {
        setModalState({
          launched: new Date(),
        });

        return;
      }

      setModalState(props!);
    },
    dismiss: () => setModalState(null),
  };

  return [modalState, methods] as const;
}
