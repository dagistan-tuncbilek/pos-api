import { Controller } from '@nestjs/common';
import { CustomerTypesService } from './customer-types.service';

@Controller('customer-types')
export class CustomerTypesController {
  constructor(private readonly customerTypesService: CustomerTypesService) {}
}
