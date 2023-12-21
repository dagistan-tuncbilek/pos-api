import {Module} from '@nestjs/common';
import {CompaniesRepositoryService} from './companies-repository.service';
import {UsersRepositoryService} from './users-repository.service';
import {ProjectsRepositoryService} from './projects-repository.service';
import {CustomerTypesRepositoryService} from './customer-types-repository.service';
import {BaseRepositoryService} from './base-repository.service';
import {PropertiesRepositoryService} from "./properties-repository.service";

@Module({
    providers: [
        BaseRepositoryService,
        CompaniesRepositoryService,
        UsersRepositoryService,
        ProjectsRepositoryService,
        CustomerTypesRepositoryService,
        PropertiesRepositoryService,
    ],
    exports: [
        CompaniesRepositoryService,
        UsersRepositoryService,
        ProjectsRepositoryService,
        CustomerTypesRepositoryService,
        PropertiesRepositoryService,
    ]
})
export class RepositoriesModule {
}
