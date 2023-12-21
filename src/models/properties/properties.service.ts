import {Injectable} from '@nestjs/common';
import {UpdatePropertyDto} from "./dto/update-property.dto";
import {CreatePropertyDto} from "./dto/create-property.dto";
import {PropertiesRepositoryService} from "../../core/repositories/properties-repository.service";

@Injectable()
export class PropertiesService {

    constructor(private propertiesRepo: PropertiesRepositoryService) {}

    create(createPropertyDto: CreatePropertyDto) {
        return this.propertiesRepo.create(createPropertyDto);
    }

    update(id: number, updatePropertyDto: UpdatePropertyDto) {
        return this.propertiesRepo.update(id, updatePropertyDto);
    }

    delete(id: number) {
        return this.propertiesRepo.delete(id);
    }
}
