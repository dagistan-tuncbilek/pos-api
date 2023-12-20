import { Module } from '@nestjs/common';
import { CustomerTypesService } from './customer-types.service';
import { CustomerTypesController } from './customer-types.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";

@Module({
  imports: [RepositoriesModule],
  controllers: [CustomerTypesController],
  providers: [CustomerTypesService],
})
export class CustomerTypesModule {}
