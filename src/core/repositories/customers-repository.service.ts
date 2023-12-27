import {Injectable} from '@nestjs/common';
import {BaseRepositoryService} from "./base-repository.service";
import {CreateCustomerDto} from "../../models/customers/dto/create-customer.dto";
import {UpdateCustomerDto} from "../../models/customers/dto/update-customer.dto";

@Injectable()
export class CustomersRepositoryService extends BaseRepositoryService {

    async create(createCustomerDto: CreateCustomerDto) {
        return this.prisma.customer
            .create({
                data: createCustomerDto,
                include: {customerType: true, addresses: true, contacts: true, projects: true}
            })
            .catch(error => this.handleRepositoryError({
                error,
                className: CustomersRepositoryService.name,
                method: 'create',
                props: {createCustomerDto}
            }));
    }

    async update(id: number, updateCustomerDto: UpdateCustomerDto) {
        return this.prisma.customer
            .update({
                where: {id},
                data: updateCustomerDto,
            })
            .catch(error => this.handleRepositoryError({
                error,
                className: CustomersRepositoryService.name,
                method: 'update',
                props: {id, updateCustomerDto}
            }));
    }
}
