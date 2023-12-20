import { Injectable } from '@nestjs/common';
import {CreateCustomerTypeDto} from "./dto/create-customer-type.dto";
import {UpdateCustomerTypeDto} from "./dto/update-customer-type.dto";
import {CustomerTypesRepositoryService} from "../../core/repositories/customer-types-repository.service";

@Injectable()
export class CustomerTypesService {

    constructor(private repo: CustomerTypesRepositoryService) {}

    create(createCustomerTypeDto: CreateCustomerTypeDto) {
        return this.repo.create(createCustomerTypeDto);
    }

    update(id: number, updateCustomerTypeDto: UpdateCustomerTypeDto) {
        return this.repo.update(id, updateCustomerTypeDto);
    }
}
