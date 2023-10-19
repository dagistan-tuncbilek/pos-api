import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './core/global/global.module';
import { SeederModule } from './config/seeder/seeder.module';

@Module({
  imports: [GlobalModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
