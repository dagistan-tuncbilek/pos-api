import { Injectable } from '@nestjs/common';
import {CompaniesRepositoryService} from "../../core/repositories/companies-repository.service";
import {UpdateCompanyDto} from "../update-company.dto";

@Injectable()
export class CompaniesService {

    constructor(private companiesRepo: CompaniesRepositoryService) {}

    company(id: number) {
        return this.companiesRepo.findOne(id);
    }

    updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
        return this.companiesRepo.updateCompany(id, updateCompanyDto);
    }
}
