import {OmitType} from "@nestjs/mapped-types";
import {CreatePropertyDto} from "./create-property.dto";

export class UpdatePropertyDto extends OmitType(CreatePropertyDto, ['customerTypeId']) {}
