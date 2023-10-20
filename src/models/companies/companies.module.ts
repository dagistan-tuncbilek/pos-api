import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [RepositoriesModule]
})
export class CompaniesModule {}
