import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CREATED_RESPONSE, DELETE_MANY_RESPONSE, GET_MANY_RESPONSE, GET_ONE_RESPONSE, UPDATED_RESPONSE } from './docs/response.docs';
import { CREATE_BODY_SCHEMA, UPDATE_BODY_SCHEMA } from './docs/record-schema.docs';
import { z } from 'zod';
import { TimesheetValidator } from './validators/timesheet.validator';
import { Request } from 'express';
import { RequestHelpers } from '#shared/utilities/request.helpers';
import { Timesheet } from './entities/timesheet.entity';

@Controller('timesheets')
export class TimesheetsController {
  validator = new TimesheetValidator();
  private entityValidator = z.number().int().positive();

  validateId = this.entityValidator.parse;
  validateIds = z.array(this.entityValidator).parse;

  constructor(private readonly timesheetsService: TimesheetsService) { }

  private parseInput = <
    ValidatorName extends keyof Pick<typeof this.validator, 'create' | 'update' | 'delete'>,
    Schema extends typeof this.validator[ValidatorName],
    Input extends Parameters<Schema['parse']>[0]
  >(
    input: Input,
    validatorName: ValidatorName
  ) => {
    try {
      return this.validator[validatorName].parse(input);
    } catch (err) {
      const error = err as Error;

      throw new BadRequestException(error.message);
    }
  };

  private parseID = (id: string): number => {
    try {
      return this.validateId(id);
    } catch {
      throw new BadRequestException(`ID must be a number`);
    }
  };


  @ApiBody({
    schema: CREATE_BODY_SCHEMA
  })
  @ApiCreatedResponse(CREATED_RESPONSE)
  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto) {
    const parsed = this.parseInput(createTimesheetDto, 'create') as {
      date: Date;
      name: string;
      lines: {
        categoryId: number;
        startTime: string;
        endTime: string;
        note: string | null;
      }[];
    };

    return this.timesheetsService.createTimesheet(parsed);
  }

  @ApiQuery({
    type: 'number',
    name: 'limit',
    required: false
  })
  @ApiQuery({
    type: 'number',
    name: 'offset',
    required: false
  })
  @ApiQuery({
    type: 'string',
    name: 'sort',
    required: false
  })
  @ApiQuery({
    type: 'string',
    name: 'filter',
    required: false
  })
  @ApiOkResponse(GET_MANY_RESPONSE)
  @Get()
  findAll(@Req() req: Request) {
    const url = `${req.url}`;
    const params = RequestHelpers.getListRequestParams<Timesheet>(url);

    return this.timesheetsService.findAllTimesheets(params);
  }

  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  })
  @ApiOkResponse(DELETE_MANY_RESPONSE)
  @Patch('delete')
  async deleteMany(@Body() ids: number[]) {
    const parsed = this.validateIds(ids);

    try {
      await this.timesheetsService.removeTimesheets(Array.from(new Set(parsed)));

      return { status: 200 };
    } catch (err) {
      const error = err as Error;

      throw new BadRequestException(error.message);
    }
  }

  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiOkResponse(GET_ONE_RESPONSE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const parsedId = this.parseID(id);

    return this.timesheetsService.findTimesheet(parsedId);
  }

  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiBody({
    schema: UPDATE_BODY_SCHEMA
  })
  @ApiOkResponse(UPDATED_RESPONSE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimesheetDto: UpdateTimesheetDto) {
    const parsedId = this.parseID(id);
    const parsed = this.parseInput(updateTimesheetDto, 'update') as {
      name: string;
      date: Date;
      lines: {
        categoryId: number;
        startTime: string;
        endTime: string;
        note: string | null;
      }[];
    };

    return this.timesheetsService.updateTimesheet(parsedId, parsed);
  }



  @ApiParam({
    type: 'number',
    name: 'id'
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'number'
        }
      }
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    const parsedId = this.parseID(id);

    return this.timesheetsService.removeTimesheet(parsedId);
  }
}
