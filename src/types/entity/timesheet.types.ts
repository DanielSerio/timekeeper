interface TimesheetBase<Type> {
  id?: string | Date;
  timesheet_date?: Date;
  entries?: Type[];
}

export interface TimesheetCreate<Type> extends TimesheetBase<Type> {
  id: Date;
  entries: Type[];
}

export interface TimesheetUpdate<Type> extends TimesheetBase<Type> {
  id?: never;
  entries: Type[];
}

export interface TimesheetRecord<Type> extends TimesheetBase<Type> {
  id: string;
  timesheet_date: Date;
  entries: Type[];
}
