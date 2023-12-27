import {IsBoolean, IsJSON, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateCustomerDto {

    @IsNumber()
    companyId: number;

    @IsString()
    number: string; // Format yy-4digit 23-1765

    @IsString()
    @IsOptional()
    vat?: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsBoolean()
    daylite: boolean;

    @IsOptional()
    properties?: any;

    @IsNumber()
    @IsOptional()
    customerTypeId?: number;
}
