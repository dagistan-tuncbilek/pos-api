import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";
import {JwtModule} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "../../core/guards/auth-guard.service";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    imports: [
        JwtModule.register({
            global: true,
            secret: 'DO NOT USE OUTSIDE OF THE SOURCE CODE.',
            signOptions: { expiresIn: '60s' },
        }),
        RepositoriesModule
    ]
})
export class AuthModule {
}
