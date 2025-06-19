import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';

@Injectable()
export class TimesheetsService {
  createTimesheet(createTimesheetDto: CreateTimesheetDto) {
    return 'This action adds a new timesheet';
  }

  findAllTimesheets() {
    return `This action returns all timesheets`;
  }

  findTimesheet(id: number) {
    return `This action returns a #${id} timesheet`;
  }

  updateTimesheet(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    return `This action updates a #${id} timesheet`;
  }

  removeTimesheet(id: number) {
    return `This action removes a #${id} timesheet`;
  }

  removeTimesheets(ids: number[]) { }
}
