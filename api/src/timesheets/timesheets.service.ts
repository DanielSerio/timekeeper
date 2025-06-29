import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  private async createTimesheetLine(timesheetId: number, line: CreateTimesheetLineDto) {
    if (!timesheetId) {
      throw new BadRequestException(`createTimesheetLine: Timesheet ID cannot be null`);
    }

    const lineEnt = new TimesheetLine();

    lineEnt.startTime = line.startTime;
    lineEnt.endTime = line.endTime;
    lineEnt.categoryId = line.categoryId;
    lineEnt.note = line.note;

    return await this.linesRepo.save({
      ...lineEnt,
      timesheetId
    });
  }

  private async updateTimesheetLine(timesheetId: number, { id, ...line }: UpdateTimesheetLineDto) {
    if (!timesheetId) {
      throw new BadRequestException(`updateTimesheetLine: Timesheet ID cannot be null`);
    }

    const found = await this.linesRepo.findOne({
      where: {
        id,
        timesheetId
      }
    });

    if (!found) {
      throw new NotFoundException(`Timesheet line with id '${id}' not found`);
    }

    try {
      if (line.startTime) {
        found.startTime = line.startTime;
      }

      if (line.endTime) {
        found.endTime = line.endTime;
      }

      if (line.categoryId) {
        found.categoryId = line.categoryId;
      }

      found.note = line.note ?? null;

      console.info('updateTimesheetLine: ', {
        timesheetId,
        id: found.id,
        categoryId: found.categoryId,
        startTime: found.startTime,
        endTime: found.endTime,
        note: found.note
      });

      return await this.linesRepo.save({
        timesheetId,
        id: found.id,
        categoryId: found.categoryId,
        startTime: found.startTime,
        endTime: found.endTime,
        note: found.note
      });
    } catch (error) {
      console.error(`updateTimesheetLine ${id}:`, error);

      throw error;
    }
  }

  private upsertTimesheetLines = async (timesheetId: number, lines: (CreateTimesheetLineDto | UpdateTimesheetLineDto)[]) => {
    const promises = [] as Promise<TimesheetLine>[];

    const mappedParams = lines.map((lineParams) => ({ ...lineParams, timesheetId }) as CreateTimesheetLineDto | UpdateTimesheetLineDto);

    if (mappedParams && mappedParams.length) {
      for (const lineParams of mappedParams) {
        if (lineParams.id) {
          promises.push(this.updateTimesheetLine(timesheetId, { ...lineParams } as UpdateTimesheetLineDto));
        } else {
          promises.push(this.createTimesheetLine(timesheetId, { ...lineParams } as CreateTimesheetLineDto));
        }
      }
    }

    console.info('All promises created');

    return await Promise.all(promises);
  };

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
    const created = await this.repo.save(timesheet);

    const createdLines = await this.upsertTimesheetLines(created.id, lines);

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
    try {
      const { lines: _fetchedLines, ...timesheet } = await this.findTimesheet(id);
      const { lines, deleteLines, ...updateProps } = updateTimesheetDto;

      if (!!updateProps.name && updateProps.name !== timesheet.name) {
        timesheet.name = updateProps.name;
      }

      let deleteLinesResult: undefined | DeleteResult;
      let updatedLines: undefined | TimesheetLine[];

      if (deleteLines?.length) {
        deleteLinesResult = await this.deleteTimesheetLines(deleteLines);
      }

      if (lines?.length) {
        updatedLines = await this.upsertTimesheetLines(id, [...lines].map((line) => ({ ...line, timesheetId: id })));
      }

      const updated = await this.repo.save({
        ...timesheet,
        timesheetId: id
      });

      return {
        updated,
        updatedLines,
        deleteLinesResult
      };
    } catch (err) {
      console.error(`updateTimesheet: ${id}`, err, updateTimesheetDto);

      throw err;
    }

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
