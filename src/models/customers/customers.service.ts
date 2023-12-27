import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import {CustomersRepositoryService} from "../../core/repositories/customers-repository.service";

@Injectable()
export class CustomersService {

  constructor(private customersRepo: CustomersRepositoryService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.customersRepo.create(createCustomerDto);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customersRepo.update(id, updateCustomerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
