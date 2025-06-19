import type {
  EmptyTimesheetLine,
  TimesheetLineCreate,
} from "#core/types/models/timesheet-line.model-types";
import type { TimesheetContextMethods } from "#timesheets/providers/timesheet/types";
import type { ComboboxItem } from "@mantine/core";
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

export function useTimesheetNewLine({ addLines }: TimesheetContextMethods) {
  const [line, _setLine] = useState<EmptyTimesheetLine | TimesheetLineCreate>({
    categoryId: null,
    startTime: null,
    endTime: null,
    note: "",
  });
  const validLine = useMemo(
    () => newLineValidator.safeParse(line),
    [line.categoryId, line.startTime, line.endTime, line.note]
  );

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
