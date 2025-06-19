import type {
  EmptyTimesheetLine,
  TimesheetLineCreate,
  TimesheetLineRecord,
} from "#core/types/models/timesheet-line.model-types";
import type {
  TimesheetContextMethods,
  TimesheetContextState,
} from "#timesheets/providers/timesheet/types";
import { canAddLine } from "#timesheets/utilities/can-add-line";
import type { ComboboxItem } from "@mantine/core";
import { isAfter, isSameDay, isSameMinute } from "date-fns";
import { useMemo, useState, type ChangeEvent } from "react";
import { z } from "zod";

const getTimeValidator = (name: "startTime" | "endTime") =>
  z
    .string()
    .length(5)
    .superRefine((val, ctx) => {
      if (!/\d{2}[:]\d{2}/g.test(val)) {
        ctx.addIssue({
          code: "invalid_date",
          path: [name],
          message: `Invalid time`,
        });
      }
    });

const newLineValidator = z.object({
  categoryId: z.number().int().positive(),
  startTime: getTimeValidator("startTime"),
  endTime: getTimeValidator("endTime"),
  note: z.string().trim().nullable(),
});

export function useTimesheetNewLine({
  timesheetContext: state,
  timesheetMethods: { addLines },
}: {
  timesheetContext: TimesheetContextState;
  timesheetMethods: TimesheetContextMethods;
}) {
  const [line, _setLine] = useState<EmptyTimesheetLine | TimesheetLineCreate>({
    categoryId: null,
    startTime: null,
    endTime: null,
    note: "",
  });
  const validLine = useMemo(() => {
    const parsed = newLineValidator
      .superRefine((record, ctx) => {
        const { overlap } = canAddLine(
          {
            categoryId: record.categoryId!,
            startTime: record.startTime!,
            endTime: record.endTime!,
            note: record.note,
          },
          state.lines as (TimesheetLineCreate | TimesheetLineRecord)[]
        );
        const testDate = `2024-12-12`;
        const start = `${testDate} ${record.startTime}`;
        const end = `${testDate} ${record.endTime}`;

        if (isAfter(start, end)) {
          ctx.addIssue({
            code: "custom",
            message: `End time cannot be before start time`,
            path: ["endTime"],
          });
        }

        if (isSameMinute(start, end)) {
          ctx.addIssue({
            code: "custom",
            message: `Interval must have a duration`,
            path: ["endTime"],
          });
        }

        if (overlap) {
          ctx.addIssue({
            code: "custom",
            message: `Lines overlap: ${(overlap.line as any).lineNo ?? overlap.index + 1}`,
            path: ["startTime", "endTime"],
          });
        }
      })
      .safeParse(line);

    if (parsed.success) {
      return {
        record: parsed.data!,
        error: null,
      };
    }

    return {
      record: null,
      error: parsed.error!,
    };
  }, [line.categoryId, line.startTime, line.endTime, line.note]);

  const setLine = _setLine;

  const setLineField = <Key extends keyof EmptyTimesheetLine>(
    field: Key,
    value: EmptyTimesheetLine[Key]
  ) =>
    _setLine((current) => ({
      ...current,
      [field]: value,
    }));

  const onCategoryChange = (value: string | null, _: ComboboxItem) => {
    if (value && !isNaN(+value)) {
      setLineField("categoryId", +value);
    } else {
      setLineField("categoryId", null);
    }
  };

  const getStringTypeChange =
    <Elm extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(
      field: keyof EmptyTimesheetLine
    ) =>
    (ev: ChangeEvent<Elm>) => {
      const value = ev.target.value || null;

      if (value) {
        setLineField(field, ev.target.value);
      } else {
        setLineField(field, null);
      }
    };

  const onStartTimeChange = getStringTypeChange("startTime");
  const onEndTimeChange = getStringTypeChange("endTime");
  const onNoteChange = getStringTypeChange<HTMLTextAreaElement>("note");

  const onAdd = () => {
    const clone = Object.freeze(structuredClone(line));

    addLines({
      categoryId: clone.categoryId!,
      startTime: clone.startTime!,
      endTime: clone.endTime!,
      note: clone.note,
    });

    setLine({
      categoryId: null,
      startTime: null,
      endTime: null,
      note: "",
    });
  };

  return [
    {
      line,
      validLine,
    },
    {
      setLineField,
      setLine,
      onAdd,
      onChange: {
        categoryId: onCategoryChange,
        startTime: onStartTimeChange,
        endTime: onEndTimeChange,
        note: onNoteChange,
      },
    },
  ] as const;
}
