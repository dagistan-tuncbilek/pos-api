import { Injectable } from '@nestjs/common';
import {PrismaService} from "./core/global/prisma.service";

@Injectable()
export class AppService {

  constructor(private prisma: PrismaService) {}

  prismaTest() {
    return this.prisma.user.findMany()
    // return this.prisma.user.create({
    //   data:{
    //     email: 'and@mail.com',
    //     name: 'Harry',
    //   }
    // })
  }
}
