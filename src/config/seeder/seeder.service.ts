import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../core/global/prisma.service";
import {faker} from "@faker-js/faker";
import {Company, InputType, Prisma, Role} from "@prisma/client";
import {CustomerSeederService} from "./customer-seeder.service";

@Injectable()
export class SeederService {

    constructor(private prisma: PrismaService, private customerSeeder: CustomerSeederService) {}

    async seed() {
        const company = await this.prisma.company.findFirst();
        if (!company){
            const company = await this.createCompany();
            await this.createUsers(company);
            await this.createCustomerTypes(company);
            await this.customerSeeder.seedCustomers(company);
            return {message: 'Seed completed!'}
        }
        return {message: 'DB is not empty!'}
    }

    private async createCompany() {
        return this.prisma.company.create({
            data: {
                name: 'SEACOTEC GmbH & Co. KG',
                vat: 'DE123456789',
                email: faker.internet.email(),
                phone: faker.phone.number(),
            }
        });
    }

    private async createUsers(company: Company) {
        const users: Prisma.UserUncheckedCreateInput[] = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                companyId: company.id,
                name: faker.person.fullName(),
                id: faker.number.int({min: 1000, max: 10000000}),
                jobTitle: faker.person.jobTitle(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                role: Role.User,
                password: 'password'
            });
        }
        users[0].email = 'robert.surma@seacotec.com';
        users[1].email = 'marcus.von-busch@seacotec.com';
        users[2].email = 'tobias.neumann@seacotec.com';
        users[3].email = 'dagistan.tuncbilek@seacotec.com';
        await this.prisma.user.createMany({data: users});
    }

    private async createCustomerTypes(company: Company) {
        const customerType = await this.prisma.customerType.create({
            data: {
                companyId: company.id,
                type: 'Ship',
                properties: {
                    createMany: {
                        data: [
                            {
                                name: 'IMO Number',
                                inputType: InputType.Number,
                            },
                            {
                                name: 'Client Number',
                                inputType: InputType.Text,
                            },
                            {
                                name: 'Is Active',
                                inputType:  InputType.Checkbox,
                            }
                        ]
                    }
                }
            },
            include: {properties: true}
        });

        for (const property of customerType.properties) {
            if (property.inputType === InputType.Number) {
                await this.prisma.validation.create({
                    data: {
                        min: 1000000,
                        max: 9999999,
                        propertyId: property.id
                    }
                });
            } else if (property.inputType === InputType.Text) {
                await this.prisma.validation.create({
                    data: {
                        maxLength: 20,
                        minLength: 5,
                        propertyId: property.id
                    }
                });
            }
        }
    }
}
