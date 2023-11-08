import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/types/request";

export class PathMinValidation {
    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    path: string;

    @IsString()
    description: string;

    @IsIn(requestMethods)
    method: RequestTypeEnum;
}


export class PathValidation extends PathMinValidation {
    @IsNumber()
    id: number

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date

    @IsString()
    deletedAt: Date | undefined
}

// export type PathDocType = InstanceType<typeof PathDoc>;
// export type PathBasicDocType = InstanceType<typeof PathBasicDoc>;

