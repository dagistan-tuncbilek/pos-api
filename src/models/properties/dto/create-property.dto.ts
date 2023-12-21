import {IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Max, MaxLength, Min} from "class-validator";
import {InputType} from "@prisma/client";
import {Transform, Type} from "class-transformer";

export class CreatePropertyDto {

    @IsNumber()
    customerTypeId: number;

    @IsString()
    @MaxLength(200)
    name: string;

    @IsEnum(InputType)
    inputType: InputType;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => +value)
    maxLength: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => +value)
    minLength: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => +value)
    max: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => +value)
    min: number;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => +value)
    @Max(5)
    @Min(0)
    decimals: number;

    @IsBoolean()
    @IsOptional()
    isEmail: boolean;
}
