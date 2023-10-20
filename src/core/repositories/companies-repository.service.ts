import {Injectable} from '@nestjs/common';
import {BaseRepositoryService} from "./base-repository.service";
import {tr} from "@faker-js/faker";

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
}
