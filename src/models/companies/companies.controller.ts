import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {

  constructor(private readonly companiesService: CompaniesService) {}

  @Get(':id')
  company(@Param('id', ParseIntPipe) id: number){
    return this.companiesService.company(id);
  }
}
