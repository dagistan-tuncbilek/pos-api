import {Module} from '@nestjs/common';
import {CompaniesRepositoryService} from './companies-repository.service';
import {UsersRepositoryService} from './users-repository.service';
import {ProjectsServiceRepository} from './projects.service-repository';
import {CustomerTypesRepositoryService} from './customer-types-repository.service';
import {BaseRepositoryService} from './base-repository.service';

@Module({
    providers: [
        BaseRepositoryService,
        CompaniesRepositoryService,
        UsersRepositoryService,
        ProjectsServiceRepository,
        CustomerTypesRepositoryService,
    ],
    exports: [
        CompaniesRepositoryService,
        UsersRepositoryService,
        ProjectsServiceRepository,
        CustomerTypesRepositoryService,
    ]
})
export class RepositoriesModule {
}
