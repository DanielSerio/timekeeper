import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { TimesheetsModule } from './timesheets/timesheets.module';

@Module({
  imports: [CategoriesModule, TimesheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
