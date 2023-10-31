import {Injectable} from '@nestjs/common';
import {PrismaService} from "./core/global/prisma.service";

@Injectable()
export class AppService {

    constructor(private prisma: PrismaService) {}

    async prismaTest() {
        return this.prisma.user.findFirst()
        // return this.prisma.user.create({
        //   data:{
        //     email: 'and@mail.com',
        //     name: 'Harry',
        //   }
        // })
    }
}
