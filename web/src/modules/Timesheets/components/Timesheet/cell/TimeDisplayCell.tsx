import { pad } from "#core/utilities/string";
import { TimesheetCell } from "./TimesheetCell";

export interface TimeDisplayProps {
  name: "line-time" | "total-time";
  minutes: number;
}

function renderTime(minutes: number): string {
  const hours = ~~(minutes / 60);
  const mins = minutes % 60;

  if (isNaN(mins) || isNaN(hours)) {
    return `00:00`;
  }

  return `${pad(hours)}:${pad(mins)}`;
}

export function TimeDisplayCell({ name, minutes }: TimeDisplayProps) {
  return <TimesheetCell name={name}>{renderTime(minutes)}</TimesheetCell>;
}
