import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client";
import { Timesheet } from "./timesheet";

@Entity()
export class TimesheetEntry {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    type: "text",
    nullable: true,
    default: null,
  })
  note: string | null = null;

  @Column({
    type: "time",
  })
  start_time!: Date;

  @Column({
    type: "time",
  })
  end_time!: Date;

  @ManyToOne(() => Client, (client) => client.entries)
  client!: Client;

  @ManyToOne(() => Timesheet, (timesheet) => timesheet.entries)
  timesheet!: Timesheet;
}

