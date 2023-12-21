import {Injectable} from '@nestjs/common';
import {PrismaService} from "../global/prisma.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class BaseRepositoryService {

    constructor(protected prisma: PrismaService,) { }

    handleRepositoryError({error, method, className, props}): string {
        console.log(error)
        let message = 'Database query error.';

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025' && error.meta.cause && typeof error.meta.cause === 'string') {
                message = error.meta.cause;
            } else if (error.code === 'P2002') {
                const target = error.meta.target as string[] | string;
                if (Array.isArray(target)) {
                    message = `This ${target.join(', ')} is in use`;
                } else if (target.endsWith('unique')) {
                    message = target.replace('_unique', '').toUpperCase() + ' already exist in database.';
                }
            } else {
                message += ' (PrismaClientKnownRequestError)'
            }
        } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
            message += ' (PrismaClientUnknownRequestError)'
        } else if (error instanceof Prisma.PrismaClientRustPanicError) {
            message += ' (PrismaClientRustPanicError)'
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
            message += ' (PrismaClientInitializationError)'
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            message += ' (Invalid invocation, database validation error.)'
        } else if (error.name === 'NotFoundError') {
            message += ' (NotFoundError)'
        }

        // let stack = message + ` Method ${method} fails`;
        // for (const key in props) {
        //     stack += `, ${key}: ${JSON.stringify(props[key])}`;
        // }
        // stack += ` Error: ${error}`
        // this.logger.error('Database error. ' + message, stack, className);
        return message;
    }
}
