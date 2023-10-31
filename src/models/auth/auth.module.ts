import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [RepositoriesModule]
})
export class AuthModule {
}
