import { CategoryRecord } from "#shared/types/models/category.model-types";
import { TimesheetLine } from "src/timesheets/entities/timesheet-line.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category implements CategoryRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null
  })
  lastUpdatedAt: Date | null = null;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true
  })
  name: string;

  @OneToMany(() => TimesheetLine, (line) => line.category)
  lines?: TimesheetLine[];
}
