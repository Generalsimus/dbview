import { Allow, IsEmpty, IsEnum, IsIn, IsString, MinLength } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/types/request";



export class PathDoc {
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

export type PathDocType = InstanceType<typeof PathDoc>;
