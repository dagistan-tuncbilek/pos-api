import { Injectable } from '@nestjs/common';
import {BaseRepositoryService} from "./base-repository.service";

@Injectable()
export class UsersRepositoryService extends BaseRepositoryService{

    async findOne(email: string) {
        return this.prisma.user.findFirst({ where: { email: email}})
    }
}
