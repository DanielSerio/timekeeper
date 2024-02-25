import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TimesheetEntry } from "./timesheet-entry";

@Entity()
export class Client {
  @PrimaryColumn({
    type: "varchar",
    precision: 16,
  })
  id!: string;

  @Column({
    type: "varchar",
    precision: 255,
    unique: true,
  })
  client_name!: string;

  @Column({
    type: "smallint",
    precision: 3,
    default: 178,
  })
  client_brand_hue: number = 178;

  @Column({
    type: "smallint",
    precision: 3,
    default: 80,
  })
  client_brand_saturation: number = 80;

  @OneToMany(() => TimesheetEntry, (entry) => entry.client)
  entries!: TimesheetEntry[];
}

