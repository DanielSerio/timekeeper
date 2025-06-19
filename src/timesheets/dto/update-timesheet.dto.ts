import { PartialType } from '@nestjs/swagger';
import { CreateTimesheetLineDto } from './create-timesheet.dto';

export class UpdateTimesheetLineDto extends PartialType(CreateTimesheetLineDto) {
  id: number;
}

export class UpdateTimesheetDto {
  date?: Date;
  name?: string | null | undefined;
  lines?: (CreateTimesheetLineDto | UpdateTimesheetLineDto)[];
  deleteLines?: number[];
}