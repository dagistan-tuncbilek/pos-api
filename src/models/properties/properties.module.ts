import {Module} from '@nestjs/common';
import {PropertiesService} from './properties.service';
import {PropertiesController} from './properties.controller';
import {RepositoriesModule} from "../../core/repositories/repositories.module";

@Module({
    imports: [RepositoriesModule],
    controllers: [PropertiesController],
    providers: [PropertiesService],
})
export class PropertiesModule {
}
