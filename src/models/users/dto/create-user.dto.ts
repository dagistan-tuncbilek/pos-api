import {IsEmail, IsEnum, IsNumber, IsOptional, IsString, MaxLength} from "class-validator";
import {Role} from "@prisma/client";

export class CreateUserDto {

    @IsNumber()
    @IsOptional()
    companyId: number;

    @IsString()
    @MaxLength(200)
    name: string;

    @IsString()
    @MaxLength(200)
    phone: string;

    @IsEmail()
    @MaxLength(200)
    email: string;

    @IsString()
    @MaxLength(255)
    jobTitle: string;

    @IsString()
    @MaxLength(255)
    password: string;

    @IsEnum(Role)
    role: Role;
}
