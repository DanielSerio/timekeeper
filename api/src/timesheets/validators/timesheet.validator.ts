import { ExtendedTimesheetCreate, TimesheetCreate, TimesheetUpdate } from "#shared/types/models/timesheet.model-types";
import { EntityValidator } from "#shared/types/utility";
import { z, ZodSchema } from "zod";

export class TimesheetValidator implements EntityValidator<ExtendedTimesheetCreate, TimesheetUpdate, { id: number; }> {
  [k: string]: object | ZodSchema<ExtendedTimesheetCreate | TimesheetUpdate | { id: number; }>;

  private _COMMON = {
    date: z.coerce.date(),
    name: z.string().trim().min(1, 'Name is required').max(64, `Name is too long (max 64)`),
    categoryId: z.number().int().positive(),
    startTime: z.string().trim().length(5, `Start time must be exactly 5 characters`),
    endTime: z.string().trim().length(5, `End time must be exactly 5 characters`),
    note: z.string().trim().nullable().transform((str) => str === '' ? null : str)
  };

  createLine = z.object({
    categoryId: this._COMMON.categoryId,
    startTime: this._COMMON.startTime,
    endTime: this._COMMON.endTime,
    note: this._COMMON.note
  });

  updateLine = z.object({
    id: z.number().int().positive().nullable().optional(),
    timesheetId: z.number().int().positive(),
    categoryId: this._COMMON.categoryId,
    startTime: this._COMMON.startTime,
    endTime: this._COMMON.endTime,
    note: this._COMMON.note,
    createdAt: z.coerce.date(),
    lastUpdatedAt: z.coerce.date().nullable()
  });

  clientUpdateLine = z.object({
    id: z.number().int().positive().nullable().optional(),
    categoryId: this._COMMON.categoryId,
    startTime: this._COMMON.startTime,
    endTime: this._COMMON.endTime,
    note: this._COMMON.note,
  });

  create = z.object({
    date: this._COMMON.date,
    name: this._COMMON.name,
    lines: z.array(this.createLine)
  });

  update = z.object({
    name: this._COMMON.name,
    lines: z.array(this.clientUpdateLine),
    removeLines: z.array(z.number().int().positive()).nullable().optional()
  });

  delete = z.object({
    id: z.number().int().positive()
  });
}