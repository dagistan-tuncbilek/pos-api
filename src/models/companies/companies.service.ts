import { Injectable } from '@nestjs/common';
import {CompaniesRepositoryService} from "../../core/repositories/companies-repository.service";

@Injectable()
export class CompaniesService {

    constructor(private companiesRepo: CompaniesRepositoryService) {}

    company(id: number) {
        return this.companiesRepo.findOne(id);
    }
}
