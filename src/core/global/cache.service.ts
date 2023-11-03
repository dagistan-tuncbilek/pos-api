import {Inject, Injectable, LoggerService} from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {DateTime} from "luxon";
import {CACHE_MANAGER} from "@nestjs/cache-manager";

@Injectable()
export class CacheService{

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}


}
