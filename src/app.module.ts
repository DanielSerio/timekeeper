import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from './categories/entities/category.entity';
import { Timesheet } from './timesheets/entities/timesheet.entity';
import { TimesheetLine } from './timesheets/entities/timesheet-line.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        url: configService.get('DB_URI'),
        entities: [
          Category,
          Timesheet,
          TimesheetLine
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    TimesheetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
