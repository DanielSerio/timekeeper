import { TimesheetCell } from "./TimesheetCell";

export interface TimeDisplayProps {
  name: "line-time" | "total-time";
  minutes: number;
}

export function TimeDisplayCell({ name }: TimeDisplayProps) {
  return <TimesheetCell name={name}>00:00</TimesheetCell>;
}
