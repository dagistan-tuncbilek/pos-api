import {IsNumber, IsString, MaxLength} from "class-validator";

export class CreateCustomerTypeDto{

    @IsString()
    @MaxLength(200)
    type: string;

    @IsNumber()
    companyId: number;

}
