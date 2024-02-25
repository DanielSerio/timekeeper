import { Like, type DataSource, Repository } from "typeorm";
import { TimesheetEntry } from "../data/entity/timesheet-entry";
import { Timesheet } from "../data/entity/timesheet";
import { isValidDate } from "../utility/is-valid-date";
import { ApiError } from "../model/ApiError";
import type {
  DeleteOperationResponseBody,
  OperationResponseBody,
} from "../types/api.types";
import type { TimesheetUpdate } from "../types/entity/timesheet.types";
import type {
  TimesheetEntryCreate,
  TimesheetEntryDelete,
  TimesheetEntryUpdate,
} from "../types/entity/timesheet-entry.types";

import type { ClientService } from "./client.service";
import { nearestRoundTime } from "../utility/nearest-round-time";

function getEntrySubService(
  repos: {
    entry: Repository<TimesheetEntry>;
    timesheet: Repository<Timesheet>;
  },
  clientService: ClientService
) {
  async function create(
    body: TimesheetEntryCreate
  ): Promise<OperationResponseBody<"CREATE", "timesheet-entry">> {
    const foundClient = await clientService.getByID(body.client_id);
    const foundTimesheet = await repos.timesheet.findOne({
      where: { id: body.timesheet_id },
    });

    if (!foundClient) {
      throw new ApiError({
        status: 404,
        message: `Client not found: (${body.client_id})`,
        cause: `No client with an ID of '${body.client_id}' was found`,
      });
    }

    if (!foundTimesheet) {
      throw new ApiError({
        status: 404,
        message: `Timesheet not found: (${body.timesheet_id})`,
        cause: `No timesheet with an ID of '${body.timesheet_id}' was found`,
      });
    }

    const getAsDate = (value: string | Date): Date => {
      return typeof value === "string" ? new Date(value) : value;
    };

    const startTime = nearestRoundTime(getAsDate(body.start_time));
    const endTime = nearestRoundTime(getAsDate(body.end_time));

    if (!isValidDate(startTime)) {
      throw new ApiError({
        message: `Invalid start time: (${body.start_time})`,
        cause: `${body.start_time} is not a valid date`,
      });
    }

    if (!isValidDate(endTime)) {
      throw new ApiError({
        message: `Invalid end time: (${body.end_time})`,
        cause: `${body.end_time} is not a valid date`,
      });
    }

    const entry = new TimesheetEntry();
    entry.client = foundClient;
    entry.timesheet = foundTimesheet;
    entry.start_time = startTime;
    entry.end_time = endTime;
    const result = await repos.entry.save(entry);

    return {
      operation: "CREATE",
      entity: "timesheet-entry",
      result,
    };
  }

  async function update(
    id: number,
    body: TimesheetEntryUpdate
  ): Promise<OperationResponseBody<"UPDATE", "timesheet-entry">> {
    let startTime;
    let endTime;

    const found = await repos.entry.findOne({ where: { id } });

    if (found === null) {
      throw new ApiError({
        status: 400,
        message: `Timesheet entry not found: (${id})`,
        cause: `No timesheet entry exists with id '${id}'`,
      });
    }

    const getAsDate = (value: string | Date): Date => {
      return typeof value === "string" ? new Date(value) : value;
    };
    if (body.start_time) {
      startTime = nearestRoundTime(getAsDate(body.start_time));
      if (!isValidDate(startTime)) {
        throw new ApiError({
          message: `Invalid start time: (${body.start_time})`,
          cause: `${body.start_time} is not a valid date`,
        });
      }
    }

    if (body.end_time) {
      endTime = nearestRoundTime(getAsDate(body.end_time));
    }

    if (!isValidDate(endTime)) {
      throw new ApiError({
        message: `Invalid end time: (${body.end_time})`,
        cause: `${body.end_time} is not a valid date`,
      });
    }

    const entry = found;
    if (startTime) {
      entry.start_time = startTime;
    }
    if (endTime) {
      entry.end_time = endTime;
    }

    if (body.note) {
      entry.note = body.note;
    }

    const result = await repos.entry.save(entry);

    return {
      operation: "UPDATE",
      entity: "timesheet-entry",
      result,
    };
  }

  async function deleteEntry(
    del: TimesheetEntryDelete
  ): Promise<DeleteOperationResponseBody<"DELETE", "timesheet-entry">> {
    const result = await repos.entry.delete(del.id);

    return {
      operation: "DELETE",
      entity: "timesheet-entry",
      result,
    };
  }

  return {
    create,
    update,
    delete: deleteEntry,
  };
}

export function getTimesheetService(
  source: DataSource,
  clientService: ClientService
) {
  const timesheetRepo = source.getRepository(Timesheet);
  const entryRepo = source.getRepository(TimesheetEntry);

  const entryService = getEntrySubService(
    {
      timesheet: timesheetRepo,
      entry: entryRepo,
    },
    clientService
  );

  async function getFullMonth(year: number, month: number) {
    const mnth = `${month}`.padStart(2, "0");
    const idPrefix = `${year}-${mnth}-`;
    return await timesheetRepo.find({
      where: {
        id: Like(`${idPrefix}%`),
      },
    });
  }

  async function getForDay(
    year: number,
    month: number,
    day: number
  ): Promise<Timesheet> {
    const mnth = `${month}`.padStart(2, "0");
    const dte = `${day}`.padStart(2, "0");
    const id = `${year}-${mnth}-${dte}`;

    if (!isValidDate(id)) {
      throw new ApiError({
        status: 400,
        message: `Invalid Date`,
        cause: `'${id}' is not a valid date`,
      });
    }

    const found = await timesheetRepo.findOne({
      where: { id },
      relations: {
        entries: true,
      },
    });

    if (found === null) {
      const ts = new Timesheet();
      ts.id = id;
      return ts;
    } else {
      return found;
    }
  }

  async function create(
    timesheet: Timesheet
  ): Promise<OperationResponseBody<"CREATE", "timesheet">> {
    const result = await timesheetRepo.save(timesheet);
    return {
      operation: "CREATE",
      entity: "timesheet",
      result,
    };
  }

  async function update(
    id: string,
    body: TimesheetUpdate<TimesheetEntry>
  ): Promise<OperationResponseBody<"UPDATE", "timesheet">> {
    const found = await timesheetRepo.findOne({ where: { id } });
    if (found === null) {
      throw new ApiError({
        status: 400,
        message: `Timesheet not found: (${id})`,
        cause: `No timesheet exists with id '${id}'`,
      });
    }

    if (body.entries) {
      found.entries = body.entries;
    }

    const result = await timesheetRepo.save(found);
    return {
      operation: "UPDATE",
      entity: "timesheet",
      result,
    };
  }

  return {
    getFullMonth,
    getForDay,
    create,
    update,
    entry: entryService,
  };
}

