import {Global, Module} from '@nestjs/common';
import {PrismaService} from './prisma.service';
import {AppLogger} from "./app-logger";

@Global()
@Module({
  providers: [PrismaService, AppLogger],
  exports: [PrismaService, AppLogger],
})
export class GlobalModule {}
