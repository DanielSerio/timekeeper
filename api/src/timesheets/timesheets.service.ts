import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTimesheetDto, CreateTimesheetLineDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto, UpdateTimesheetLineDto } from './dto/update-timesheet.dto';
import { DataSource, DeleteResult, Filter, FindManyOptions, FindOptionsOrder, In, Repository } from 'typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { ListSorting } from '#shared/types/request/list.request-types';
import { RequestHelpers } from '#shared/utilities/request.helpers';
import { TimesheetLine } from './entities/timesheet-line.entity';
import { TimesheetLineRecord } from '#shared/types/models/timesheet-line.model-types';

@Injectable()
export class TimesheetsService {
  private get repo(): Repository<Timesheet> {
    return this.source.getRepository(Timesheet);
  }

  private get linesRepo(): Repository<TimesheetLine> {
    return this.source.getRepository(TimesheetLine);
  }

  constructor(
    private source: DataSource
  ) { }

  private convertFiltersToWhere(filters: Filter<Timesheet>[]): FindManyOptions<Timesheet>['where'] {
    let where = {} as NonNullable<FindManyOptions<Timesheet>['where']>;

    for (const filter of filters) {
      const affectedColumns = Object.keys(filter);

      for (const column of affectedColumns) {
        if (!where[column] && !!filter[column]) {
          where[column] = [];
        }

        where[column].push(filter[column]);
      }
    }

    return where;
  }

  private convertSortingToOrder(sort: ListSorting): FindOptionsOrder<Timesheet> {
    const order: FindOptionsOrder<Timesheet> = {};
    const ascending = [
      'ascending',
      1
    ] as any[];
    const descending = [
      'descending',
      -1
    ] as any[];

    for (const key in sort) {
      const name = key as keyof Timesheet;
      let dir = sort[key];

      if (dir !== null && dir !== undefined) {
        if (ascending.includes(dir)) {
          dir = 'asc';
        }

        if (descending.includes(dir)) {
          dir = 'desc';
        }

        if (['asc', 'desc'].includes(`${dir}`)) {
          order[name] = dir as 'asc' | 'desc';
        }
      }
    }

    return order;
  }

  private deleteTimesheetLines(lineIds: number[]) {
    return this.linesRepo.delete(lineIds);
  }

  private async createTimesheetLine(line: CreateTimesheetLineDto) {
    const lineEnt = new TimesheetLine();

    Object.assign(lineEnt, line);

    return await this.linesRepo.save(lineEnt);
  }

  private async updateTimesheetLine({ id, ...line }: UpdateTimesheetLineDto) {
    const found = await this.linesRepo.findOne({
      where: {
        id
      }
    });

    if (!found) {
      throw new NotFoundException(`Timesheet line with id '${id}' not found`);
    }

    Object.assign(found, line);

    return await this.linesRepo.save(found);
  }

  private async upsertTimesheetLines(lines: (CreateTimesheetLineDto | UpdateTimesheetLineDto)[]) {
    const promises = [] as Promise<TimesheetLine>[];

    for (const lineParams of lines) {
      if (lineParams.id) {
        promises.push(this.updateTimesheetLine(lineParams as UpdateTimesheetLineDto));
      } else {
        promises.push(this.createTimesheetLine(lineParams as CreateTimesheetLineDto));
      }
    }

    return await Promise.all(promises);
  }

  private getLineForTimesheet(timesheetId: number, select: (keyof TimesheetLineRecord)[] = ['id']) {
    return this.linesRepo.find({
      select,
      where: {
        timesheetId
      }
    });
  }

  async createTimesheet({ lines, ...createTimesheetDto }: CreateTimesheetDto) {
    const timesheet = new Timesheet();

    Object.assign(timesheet, createTimesheetDto);

    const createdLines = await this.upsertTimesheetLines(lines);

    const created = await this.repo.save(timesheet);

    return {
      created,
      lines: createdLines
    };
  }

  async findAllTimesheets(params: ReturnType<typeof RequestHelpers.getListRequestParams<Timesheet>>) {
    const where = params.filtering ? this.convertFiltersToWhere(params.filtering) : undefined;
    const order = params.sorting ? this.convertSortingToOrder(params.sorting) : undefined;

    const count = await this.repo.count({
      where
    });
    const found = await this.repo.find({
      where,
      take: params.paging.limit,
      skip: params.paging.offset,
      order,
    });

    const totalPages = Math.ceil(count / params.paging.limit);

    return {
      paging: {
        ...params.paging,
        totals: {
          records: count,
          pages: totalPages
        }
      },
      sorting: params.sorting ?? null,
      filtering: params.filtering ?? null,
      records: found
    };
  }

  async findTimesheet(id: number, minimal?: boolean) {
    let found: null | Timesheet = null;

    if (minimal) {
      found = await this.repo.findOne({
        where: {
          id
        },
      });
    } else {
      found = await this.repo.findOne({
        where: {
          id
        },
        relations: {
          lines: {
            category: true
          }
        }
      });
    }

    if (!found) {
      throw new NotFoundException(`Timesheet with id '${id}' not found`);
    }

    return found;
  }

  async findTimesheets(ids: number[]) {
    const found = await this.repo.find({
      where: {
        id: In(ids)
      },
      relations: {
        lines: {
          category: true
        }
      }
    });

    if (!found || found.length === 0) {
      throw new NotFoundException(`Timesheets with id set '${ids.toString()}' not found`);
    }

    return found;
  }

  async updateTimesheet(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    const timesheet = await this.findTimesheet(id);
    const { lines, deleteLines, ...updateProps } = updateTimesheetDto;

    Object.assign(timesheet, updateProps);
    let deleteLinesResult: undefined | DeleteResult;
    let updatedLines: undefined | TimesheetLine[];

    if (deleteLines?.length) {
      deleteLinesResult = await this.deleteTimesheetLines(deleteLines);
    }

    if (lines?.length) {
      updatedLines = await this.upsertTimesheetLines(lines);
    }

    const updated = await this.repo.save(timesheet);

    return {
      updated,
      updatedLines,
      deleteLinesResult
    };
  }

  async removeTimesheet(id: number) {
    const foundTimesheet = await this.findTimesheet(id, true);
    const lineIds = (await this.getLineForTimesheet(id)).map(({ id }) => id);

    const [deleteLinesResult, removed] = await Promise.all([
      this.linesRepo.delete(lineIds),
      this.repo.remove(foundTimesheet)
    ]);

    return {
      removed,
      deleteLinesResult
    };
  }

  async removeTimesheets(ids: number[]) {
    const foundSheets = await this.findTimesheets(ids);
    const foundSheetLines = foundSheets.map((sheet) => sheet.lines?.map((line) => line.id) ?? []).flat();
    let deleteLinesResult: undefined | DeleteResult;

    if (foundSheetLines.length) {
      try {
        deleteLinesResult = await this.linesRepo.delete(foundSheetLines);
      } catch (err) {
        const error = err as Error;

        throw new InternalServerErrorException(error.message);
      }
    }

    const deleteTimesheetsResult = await this.repo.delete(ids);

    return {
      deleteTimesheetsResult,
      deleteLinesResult
    };
  }
}
