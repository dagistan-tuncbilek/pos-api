import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {SeederService} from "./config/seeder/seeder.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private seederService: SeederService) {}

  @Get()
  getHello() {
    return this.appService.prismaTest();
  }

  @Get('seed')
  seed(){
    return this.seederService.seed();
  }
}
