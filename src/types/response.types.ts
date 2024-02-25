import type { ApiError } from "../model/ApiError";
import type {
  DeleteOperationResponseBody,
  EntityName,
  OperationResponseBody,
  TimesheetResponseBody,
} from "./api.types";

export type ApiResponse<Type extends object> = Type & { status: number };

export type TimesheetResponse<EntryType> = ApiResponse<
  TimesheetResponseBody<EntryType>
>;

export type ApiErrorResponse = ApiResponse<ApiError>;

export type CreateOperationResponse<Entity extends EntityName> = ApiResponse<
  OperationResponseBody<"CREATE", Entity>
>;

export type UpdateOperationResponse<Entity extends EntityName> = ApiResponse<
  OperationResponseBody<"UPDATE", Entity>
>;

export type DeleteOperationResponse<
  Entity extends Omit<EntityName, "timesheet">
> = ApiResponse<DeleteOperationResponseBody<"DELETE", Entity>>;
