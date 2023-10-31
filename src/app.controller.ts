import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {SeederService} from "./config/seeder/seeder.service";
import {DateTime} from "luxon";
import {AppLogger} from "./core/global/app-logger";

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private seederService: SeederService,
      private appLogger: AppLogger
  ) {}

  @Get()
  async test() {
    // await this.appLogger.log("log");
    this.appLogger.error({
      message: 'Error message',
      stack: {ctx: 'dummy context', aaa: true},
      context: AppController.name
    });
    return this.appService.prismaTest();
  }

  @Get('seed')
  seed(){
    return this.seederService.seed();
  }
}
