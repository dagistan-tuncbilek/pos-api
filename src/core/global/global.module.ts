import {Global, Module} from '@nestjs/common';
import {PrismaService} from './prisma.service';
import {AppLogger} from "./app-logger";
import { AsyncLocalStorage } from 'async_hooks';
import {CacheModule} from "@nestjs/cache-manager";

@Global()
@Module({
    imports: [CacheModule.register()],
    providers: [
        PrismaService,
        AppLogger,
        {
            provide: AsyncLocalStorage,
            useValue: new AsyncLocalStorage(),
        },
    ],
    exports: [PrismaService, AppLogger, AsyncLocalStorage],
})
export class GlobalModule {
}
