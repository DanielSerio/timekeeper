import "reflect-metadata";
import { DataSource, type DataSourceOptions } from "typeorm";
import { Client } from "./entity/client";
import { Timesheet } from "./entity/timesheet";
import { TimesheetEntry } from "./entity/timesheet-entry";

const dataSourceConfig: DataSourceOptions = {
  type: "sqlite",
  database: "./data.db",
  entities: [Client, Timesheet, TimesheetEntry],
  synchronize: import.meta.env.PROD === true ? false : true,
};

const AppDataSource = new DataSource(dataSourceConfig);

export async function getDataSource(): Promise<DataSource> {
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  } else {
    return await AppDataSource.initialize();
  }
}

