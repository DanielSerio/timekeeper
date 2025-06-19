import { TimesheetRecord } from "#shared/types/models/timesheet.model-types";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TimesheetLine } from "./timesheet-line.entity";

@Entity()
export class Timesheet implements TimesheetRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 64
  })
  name: string;

  @Column({
    type: 'date'
  })
  date: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null
  })
  lastUpdatedAt: Date | null = null;

  @OneToMany(() => TimesheetLine, (line) => line.timesheet)
  lines?: TimesheetLine[];
}
