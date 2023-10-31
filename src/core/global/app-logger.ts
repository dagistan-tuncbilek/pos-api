import {Injectable, LoggerService} from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {DateTime} from "luxon";

@Injectable()
export class AppLogger{

    constructor(private prisma: PrismaService) {}

    error(appLogData: AppLogData) {
        console.log(appLogData);
        this.createLog('Error', appLogData);
    }

    warn(appLogData: AppLogData) {
        console.log(appLogData);
        this.createLog('Warn', appLogData);
    }

    async info(appLogData: AppLogData) {
        console.log(appLogData);
        this.createLog('Info', appLogData);
    }
    //
    // debug(message: any, ...optionalParams: any[]): any {
    // }
    //
    // fatal(message: any, ...optionalParams: any[]): any {
    // }
    //
    // verbose(message: any, ...optionalParams: any[]): any {
    // }

    private async createLog(level: string, appLogData: AppLogData) {
        await this.prisma.appLog.create({
            data: {
                level: level,
                message: appLogData.message,
                stack: appLogData.stack,
                context: appLogData.context
            }
        });
    }
}

interface AppLogData{
    message: string;
    stack?: any;
    context: string;
}
