import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TimesheetLineRecord } from '../../shared/types/models/timesheet-line.model-types';
import { Timesheet } from './timesheet.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class TimesheetLine implements TimesheetLineRecord {
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
    type: 'int'
  })
  timesheetId: number;

  @Column({
    type: 'int'
  })
  categoryId: number;

  @Column({
    type: 'char',
    length: 5
  })
  startTime: string;

  @Column({
    type: 'char',
    length: 5
  })
  endTime: string;

  @Column({
    type: 'text',
    nullable: true,
    default: null
  })
  note: string | null = null;

  @ManyToOne(() => Timesheet)
  @JoinColumn({
    name: 'timesheetId',
    referencedColumnName: 'id'
  })
  timesheet?: Timesheet;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id'
  })
  category?: Category;
}