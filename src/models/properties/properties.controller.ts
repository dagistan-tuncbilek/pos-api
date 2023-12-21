import {Body, Controller, Delete, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {PropertiesService} from './properties.service';
import {CreatePropertyDto} from "./dto/create-property.dto";
import {UpdatePropertyDto} from "./dto/update-property.dto";

@Controller('properties')
export class PropertiesController {

  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto){
    return this.propertiesService.create(createPropertyDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePropertyDto: UpdatePropertyDto){
    return this.propertiesService.update(id, updatePropertyDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number){
    return this.propertiesService.delete(id);
  }
}
