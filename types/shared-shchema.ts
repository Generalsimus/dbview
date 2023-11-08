import { isNumber } from "class-validator"




export class Paging<M> {
    items: M[]
    page: number
    maxPage: number
}
