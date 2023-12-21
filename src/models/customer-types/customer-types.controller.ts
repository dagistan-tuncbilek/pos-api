import {Body, Controller, Delete, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { CustomerTypesService } from './customer-types.service';
import {CreateCustomerTypeDto} from "./dto/create-customer-type.dto";
import {UpdateCustomerTypeDto} from "./dto/update-customer-type.dto";

@Controller('customer-types')
export class CustomerTypesController {

  constructor(private readonly customerTypesService: CustomerTypesService) {}

  @Post()
  create(@Body() createCustomerTypeDto: CreateCustomerTypeDto){
    return this.customerTypesService.create(createCustomerTypeDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerTypeDto: UpdateCustomerTypeDto){
    return this.customerTypesService.update(id, updateCustomerTypeDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.customerTypesService.delete(id);
  }

}
