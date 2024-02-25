export type DeleteObject<
  Type extends object = {},
  IDType extends string | number = number
> = { id: IDType } & Type;

export interface TimesheetResponseBody<Entry> {
  id: string;
  timesheet_date: Date;
  entries: Entry[];
}

export type EntityName = "timesheet" | "timesheet-entry" | "client";
export type OperationName = "CREATE" | "UPDATE";

export type DeleteOperationName = "DELETE";

interface OperationResponseBodyBase<
  OpName extends OperationName | DeleteOperationName,
  Entity extends EntityName | Omit<EntityName, "timesheet">
> {
  operation: OpName;
  entity: Entity;
}

export interface OperationResponseBody<
  OpName extends OperationName,
  Entity extends EntityName
> extends OperationResponseBodyBase<OpName, Entity> {
  result: any; //TODO: UpdateResult
}

export interface DeleteOperationResponseBody<
  OpName extends DeleteOperationName,
  Entity extends Omit<EntityName, "timesheet">
> extends OperationResponseBodyBase<OpName, Entity> {
  result: any; //TODO: DeleteResult;
}

