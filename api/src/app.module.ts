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
import { DevtoolsModule } from '@nestjs/devtools-integration';

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
        synchronize: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    CategoriesModule,
    TimesheetsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
