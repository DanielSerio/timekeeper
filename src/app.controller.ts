import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        "system": {
          type: 'string'
        },
        at: {
          type: 'date'
        },
        host: {
          type: "string"
        }
      },
      example: {
        system: 'arm64',
        at: new Date(),
        host: 'Hostname'
      }
    },
    description: 'Get info about the api server. can be used as a healthcheck'
  })
  info() {
    return this.appService.getInfo();
  }
}
