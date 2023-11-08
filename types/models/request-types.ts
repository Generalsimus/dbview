import { IsNumber, ValidateNested, isNumber } from "class-validator";
import { PathValidation } from "./path";
import { ClassToObject } from "../generics";




/////////////////////////////////////////////////////////////////

// type FindOnePathArg = Partial<InstanceType<typeof PathDoc>>
// type FindOnePathRes = PathDoc


///////////////////////////////////////////////////////////////// 
// implements ClassToObject<typeof >


export class FindManyPath {
    ware: ClassToObject<typeof PathValidation>
    @IsNumber()
    page: number
    @IsNumber()
    docsCount: number
}
export type FindPathArg = InstanceType<typeof FindManyPath>

// export class FindManyPathRes 
export type FindPathRes = {
    items: PathValidation[]
    itemsDefaultSize: number
    page: number
    maxPage: number
}
/////////////////////////////////////////////////////////////////