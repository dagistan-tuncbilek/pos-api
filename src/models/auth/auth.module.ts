import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
    ],
    imports: [
        JwtModule.registerAsync({
            useFactory: async (config: ConfigService) => ({
                secret: config.getOrThrow('JWT_SECRET')
            }),
            inject: [ConfigService],
        }),
        RepositoriesModule
    ],
    exports: [JwtModule]
})
export class AuthModule {
}
