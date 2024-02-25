import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TimesheetEntry } from "./timesheet-entry";

@Entity()
export class Timesheet {
  @PrimaryColumn({
    type: "varchar",
    precision: 10,
  })
  id!: string;

  @OneToMany(() => TimesheetEntry, (entry) => entry.timesheet)
  entries!: TimesheetEntry[];
}

