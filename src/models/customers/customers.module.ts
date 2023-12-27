import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";

@Module({
  imports: [RepositoriesModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
