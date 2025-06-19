import type {
  TimesheetLineCreate,
  TimesheetLineRecord,
} from "#core/types/models/timesheet-line.model-types";
import type { TimesheetContextMethods } from "#timesheets/providers/timesheet/types";

export function getEditLineHandlers(
  methods: TimesheetContextMethods,
  ctx: { line: TimesheetLineCreate | TimesheetLineRecord; idx: number }
) {
  const pad = (val: number) => `${val}`.padStart(2, "0");

  return {
    categoryId: (value: string | null) => {
      const id = !value || isNaN(+value) ? null : +value;

      if (id) {
        const { line } = ctx;

        methods.updateLine({
          id: line.id,
          lineNo: ctx.idx,
          categoryId: id,
          startTime: line.startTime,
          endTime: line.endTime,
          note: line.note,
        });
      }
    },
    startTime: (ev: React.ChangeEvent<HTMLInputElement>) => {
      const date = ev.target.valueAsDate;

      if (date) {
        const { line } = ctx;
        const h = date.getUTCHours();
        const m = date.getUTCMinutes();

        methods.updateLine({
          id: line.id,
          lineNo: ctx.idx,
          categoryId: line.categoryId,
          startTime: `${pad(h)}:${pad(m)}`,
          endTime: line.endTime,
          note: line.note,
        });
      }
    },
    endTime: (ev: React.ChangeEvent<HTMLInputElement>) => {
      const date = ev.target.valueAsDate;

      if (date) {
        const { line } = ctx;
        const h = date.getUTCHours();
        const m = date.getUTCMinutes();

        methods.updateLine({
          id: line.id,
          lineNo: ctx.idx,
          categoryId: line.categoryId,
          startTime: line.startTime,
          endTime: `${pad(h)}:${pad(m)}`,
          note: line.note,
        });
      }
    },
    note: (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { line } = ctx;
      const value = ev.target.value;

      methods.updateLine({
        id: line.id,
        lineNo: ctx.idx,
        categoryId: line.categoryId,
        startTime: line.startTime,
        endTime: line.endTime,
        note: value ?? null,
      });
    },
  } as const;
}
