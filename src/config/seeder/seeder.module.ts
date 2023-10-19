import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import {CustomerSeederService} from "./customer-seeder.service";

@Module({
  providers: [SeederService, CustomerSeederService],
  exports: [SeederService]
})
export class SeederModule {}
