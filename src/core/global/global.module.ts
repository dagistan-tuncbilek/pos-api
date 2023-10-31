import {Global, Module} from '@nestjs/common';
import {PrismaService} from './prisma.service';
import {AppLogger} from "./app-logger";
import { AsyncLocalStorage } from 'async_hooks';

@Global()
@Module({
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
