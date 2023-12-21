import {Injectable} from '@nestjs/common';
import {CreateCustomerTypeDto} from "../../models/customer-types/dto/create-customer-type.dto";
import {UpdateCustomerTypeDto} from "../../models/customer-types/dto/update-customer-type.dto";
import {BaseRepositoryService} from "./base-repository.service";

@Injectable()
export class CustomerTypesRepositoryService extends BaseRepositoryService {

    async create(createCustomerTypeDto: CreateCustomerTypeDto) {
        return this.prisma.customerType
            .create({data: createCustomerTypeDto})
            .catch(error => this.handleRepositoryError({
                error,
                className: CustomerTypesRepositoryService.name,
                method: 'create',
                props: {createCustomerTypeDto}
            }));
    }

    async update(id: number, updateCustomerTypeDto: UpdateCustomerTypeDto) {
        return this.prisma.customerType
            .update({where: {id}, data: updateCustomerTypeDto, include: {properties: true}})
            .catch(error => this.handleRepositoryError({
                error,
                className: CustomerTypesRepositoryService.name,
                method: 'update',
                props: {id, updateCustomerTypeDto}
            }));
    }

    async delete(id: number) {
        return this.prisma.customerType
            .delete({where: {id: id}})
            .catch(error => this.handleRepositoryError({
                error,
                className: CustomerTypesRepositoryService.name,
                method: 'delete',
                props: {id}
            }));
    }
}
