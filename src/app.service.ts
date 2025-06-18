import { Injectable } from '@nestjs/common';
import os from 'os';
import { ApiInfo } from './shared/types/response/app.response-types';


@Injectable()
export class AppService {
  getInfo(): ApiInfo {
    return {
      at: new Date(),
      system: os.arch(),
      host: os.hostname()
    };
  }
}
