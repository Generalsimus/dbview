 











export const enum RequestTypeEnum {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
}
export const requestMethods: RequestTypeEnum[] = [
    RequestTypeEnum.GET,
    RequestTypeEnum.POST,
    RequestTypeEnum.DELETE,
    RequestTypeEnum.PUT
]
export type RequestMethodType = typeof requestMethods;