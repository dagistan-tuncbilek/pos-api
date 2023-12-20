import {OmitType} from "@nestjs/mapped-types";
import {CreateCustomerTypeDto} from "./create-customer-type.dto";

export class UpdateCustomerTypeDto extends OmitType(CreateCustomerTypeDto, ['companyId']) {
}
