import {Logger, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {GlobalModule} from './core/global/global.module';
import {SeederModule} from './config/seeder/seeder.module';
import {UsersModule} from './models/users/users.module';
import {CompaniesModule} from './models/companies/companies.module';
import {ProjectsModule} from './models/projects/projects.module';
import {AuthModule} from './models/auth/auth.module';
import {CustomerTypesModule} from './models/customer-types/customer-types.module';
import {RepositoriesModule} from './core/repositories/repositories.module';
import {AppLogger} from "./core/global/app-logger";

@Module({
    imports: [
        GlobalModule,
        SeederModule,
        UsersModule,
        CompaniesModule,
        ProjectsModule,
        AuthModule,
        CustomerTypesModule,
        RepositoriesModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
    ],
})
export class AppModule {
}
