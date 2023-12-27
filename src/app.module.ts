import {Module} from '@nestjs/common';
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
import {APP_GUARD} from "@nestjs/core";
import {ThrottlerModule} from "@nestjs/throttler";
import {ConfigModule} from "@nestjs/config";
import {AuthGuard} from "./core/guards/auth-guard";
import { PropertiesModule } from './models/properties/properties.module';
import { CustomersModule } from './models/customers/customers.module';

@Module({
    imports: [
        GlobalModule,
        SeederModule,
        UsersModule,
        CompaniesModule,
        ProjectsModule,
        AuthModule,
        CustomerTypesModule,
        RepositoriesModule,
        ConfigModule.forRoot({isGlobal: true, cache: true}),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 20,
        }]),
        PropertiesModule,
        CustomersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {
}
