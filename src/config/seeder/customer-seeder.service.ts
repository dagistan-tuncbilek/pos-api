import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../core/global/prisma.service";
import {Company, Project, Role, User} from "@prisma/client";
import {faker} from "@faker-js/faker";

@Injectable()
export class CustomerSeederService {

    customerNumber = 1100;
    projectNumber = 1100;

    constructor(private prisma: PrismaService) {}

    async seedCustomers(company: Company) {
        const users = await this.prisma.user.findMany({where: {role: Role.User}});
        for (let i = 1; i <= 20; i++) {
            const customer = await this.prisma.customer.create({
                data: {
                    companyId: company.id,
                    number: `23${this.customerNumber++}`,
                    name: faker.company.name(),
                    vat: 'DE' + faker.number.int({min: 123456789, max: 923456789}),
                    note: faker.lorem.sentence(),
                    daylite: faker.datatype.boolean(),
                    addresses: {createMany: {data: this.addressesData()}},
                    contacts: {createMany: {data: this.contactsData()}},
                    projects: {createMany: {data: this.projectsData(users)}},
                },
                include: {projects: true}
            });
            for (const project of customer.projects) {
                await this.createQuotations(project);
                await this.createOrder(project);
                await this.createExpenses(project);
                await this.createReports(project, users);
                await this.createInvoices(project);
            }
        }
    }

    private document = (projectId: number, reportId?: number) => {
        return {
            id: faker.number.int({min: 1000, max: 10000000}),
            filename: faker.system.commonFileName() + '.' + faker.system.commonFileExt(),
            originalname: faker.system.fileName(),
            path: faker.system.directoryPath(),
            mimetype: faker.system.mimeType(),
            size: faker.number.int({min: 1000, max: 10000000}),
            description: faker.lorem.sentence(100),
            projectId: projectId,
            reportId: reportId,
        }
    }

    private addressesData = () => ([
        {
            city: faker.location.city(),
            country: faker.location.country(),
            postcode: faker.location.zipCode(),
            state: faker.location.state(),
            street: faker.location.street(),
            type: 'Work',
        },
        {
            city: faker.location.city(),
            country: faker.location.country(),
            postcode: faker.location.zipCode(),
            state: faker.location.state(),
            street: faker.location.street(),
            type: 'Delivery',
        }
    ]);

    private contactsData() {
        return [
            {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                jobTitle: faker.person.jobTitle()
            },
            {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                jobTitle: faker.person.jobTitle()
            }
        ];
    }

    private async createQuotations(project: Project) {
        await this.prisma.quotation.createMany({
            data: [
                {
                    projectId: project.id,
                    isDone: faker.datatype.boolean(),
                    date: faker.date.anytime().toISOString(),
                    quotationId: 'SCT-AN-20230383',
                    price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                },
                {
                    projectId: project.id,
                    isDone: faker.datatype.boolean(),
                    date: faker.date.anytime().toISOString(),
                    quotationId: 'SCT-AN-20230383',
                    price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                }
            ]
        });
    }

    private async createOrder(project: Project) {
        await this.prisma.order.create({
            data: {
                projectId: project.id,
                date: faker.date.anytime().toISOString(),
                deliveryDate: faker.date.anytime().toISOString(),
                completionDate: faker.date.anytime().toISOString(),
                price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
            }
        });
    }

    private async createExpenses(project: Project) {
        await this.prisma.expense.createMany({
            data: [
                {
                    projectId: project.id,
                    cost: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                    distance: faker.number.int({min: 20, max: 2200}),
                    vehicle: 'Car',
                    travelTime: faker.number.int({min: 1, max: 21}),
                    date: faker.date.anytime().toISOString(),
                },
                {
                    projectId: project.id,
                    cost: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                    distance: faker.number.int({min: 20, max: 2200}),
                    vehicle: 'Car',
                    travelTime: faker.number.int({min: 1, max: 21}),
                }
            ]
        });
    }

    private async createReports(project: Project, users: User[]) {
        await this.prisma.report.createMany({
            data: [
                {
                    projectId: project.id,
                    completionDate: faker.date.anytime().toISOString(),
                    reviewDate: faker.date.anytime().toISOString(),
                    type: faker.helpers.arrayElement(['Subcontracted Service', 'Report']),
                    userId: faker.helpers.arrayElement(users).id,
                },
                {
                    projectId: project.id,
                    completionDate: faker.date.anytime().toISOString(),
                    reviewDate: faker.date.anytime().toISOString(),
                    type: faker.helpers.arrayElement(['Subcontracted Service', 'Report']),
                    userId: faker.helpers.arrayElement(users).id,
                }
            ]
        });
    }

    private async createInvoices(project: Project) {
        await this.prisma.invoice.createMany({
            data: [
                {
                    projectId: project.id,
                    price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                    invoiceId: 'DE-13629439',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    projectId: project.id,
                    price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                    invoiceId: 'DE-89765643',
                    date: faker.date.anytime().toISOString(),
                },
                {
                    projectId: project.id,
                    price: +faker.finance.amount({max: 3000, min: 100, dec: 0}),
                    invoiceId: 'DE-56444116',
                    date: faker.date.anytime().toISOString(),
                }
            ]
        });
    }

    private projectsData(users: User[]) {
        const projects = [];
        for (let i = 0; i < faker.number.int({min: 2, max: 15}); i++) {
            projects.push({
                number: `2023${this.projectNumber++}`,
                name: faker.person.fullName(),
                description: faker.lorem.sentence(),
                createdAt: faker.date.anytime().toISOString(),
                updatedAt: faker.date.anytime().toISOString(),
                userId: faker.helpers.arrayElement(users).id,
                daylite: faker.datatype.boolean(),
                riskAcceptable: faker.datatype.boolean(),
                riskCar: faker.number.int({min: 100000, max: 10000000}).toString(),
                resources: faker.datatype.boolean(),
                resourcesCar: faker.number.int({min: 100000, max: 10000000}).toString(),
                serviceType: faker.helpers.arrayElement(['Inspection', 'Consulting', 'Training', 'Other']),
                subcontractor: faker.company.name(),
            });
        }
        return projects;
    }
}
