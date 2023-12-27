import {Injectable} from '@nestjs/common';
import {BaseRepositoryService} from "./base-repository.service";
import {tr} from "@faker-js/faker";
import {UpdateCompanyDto} from "../../models/companies/dto/update-company.dto";

@Injectable()
export class CompaniesRepositoryService extends BaseRepositoryService {

    findOne(id: number) {
        return this.prisma.company.findUnique({
            where: {id},
            include: {
                users: true,
                customerTypes: {include: {properties: {include: {validations: true}}}},
                customers: {
                    include: {
                        addresses: true,
                        contacts: true,
                        projects: {
                            include: {
                                documents: true,
                                expenses: true,
                                order: true,
                                invoices: true,
                                reports: true,
                                quotations: true
                            }
                        }
                    }
                }
            }
        })
    }

    async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
        return this.prisma.company
            .update({ where: { id }, data: updateCompanyDto })
            .catch(error => this.handleRepositoryError({
                error: error,
                method: 'updateCompany',
                props: {id, updateCompanyDto},
                className: CompaniesRepositoryService.name
            }));
    }
}
