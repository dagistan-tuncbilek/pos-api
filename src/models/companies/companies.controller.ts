import {Body, Controller, Get, Param, ParseIntPipe, Patch, UseGuards} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import {UpdateCompanyDto} from "./dto/update-company.dto";

@Controller('companies')
export class CompaniesController {

  constructor(private readonly companiesService: CompaniesService) {}

  @Get(':id')
  company(@Param('id', ParseIntPipe) id: number){
    return this.companiesService.company(id);
  }

  @Patch(':id')
  updateCompany(@Param('id', ParseIntPipe) id: number, @Body() updateCompanyDto: UpdateCompanyDto){
    return this.companiesService.updateCompany(id, updateCompanyDto);
  }
}
