import { Module } from '@nestjs/common';
import { CustomerTypesService } from './customer-types.service';
import { CustomerTypesController } from './customer-types.controller';

@Module({
  controllers: [CustomerTypesController],
  providers: [CustomerTypesService],
})
export class CustomerTypesModule {}
