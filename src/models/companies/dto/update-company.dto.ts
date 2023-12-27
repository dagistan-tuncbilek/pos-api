import {IsEmail, IsOptional, IsString, Max, MaxLength} from "class-validator";

export class UpdateCompanyDto{

    @IsOptional()
    @MaxLength(200)
    @IsString()
    name: string;

    @IsOptional()
    @MaxLength(200)
    @IsString()
    phone: string;

    @IsOptional()
    @MaxLength(200)
    @IsEmail()
    email: string;

    @IsOptional()
    @MaxLength(200)
    @IsString()
    vat: string;
}
