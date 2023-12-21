import {Injectable} from '@nestjs/common';
import {CreatePropertyDto} from "../../models/properties/dto/create-property.dto";
import {UpdatePropertyDto} from "../../models/properties/dto/update-property.dto";
import {BaseRepositoryService} from "./base-repository.service";

@Injectable()
export class PropertiesRepositoryService extends BaseRepositoryService {

    async create(createPropertyDto: CreatePropertyDto) {
        const {name, inputType, customerTypeId, ...validationData} = createPropertyDto;
        return this.prisma.property
            .create({data: {name, inputType, customerTypeId, validations: {create: validationData}}})
            .catch(error => this.handleRepositoryError({
                error,
                className: PropertiesRepositoryService.name,
                method: 'create',
                props: {createPropertyDto}
            }));
    }

    async update(id: number, updatePropertyDto: UpdatePropertyDto) {
        const {name, inputType, ...validationData} = updatePropertyDto;
        try {
            if (Object.keys(validationData).length) {
                await this.prisma.validation.update({where: {propertyId: id}, data: validationData});
            }
            return this.prisma.property.update({
                where: {id: id},
                data: {name, inputType},
                include: {validations: true}
            });
        } catch (error) {
            this.handleRepositoryError({
                error,
                className: PropertiesRepositoryService.name,
                method: 'update',
                props: {updatePropertyDto}
            })
        }

    }

    async delete(id: number) {
        return this.prisma.property
            .delete({where: {id: id}})
            .catch(error => this.handleRepositoryError({
                error,
                className: PropertiesRepositoryService.name,
                method: 'delete',
                props: {id}
            }));
    }
}
