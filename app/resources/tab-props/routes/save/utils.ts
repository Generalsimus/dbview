import { MakeCreateOrUpdate } from "@/basic/db-basic-schema" 
import { Route } from "@/basic/models/route/route"

export const getBasicRouteDoc = (): MakeCreateOrUpdate<Route> => {
    return {
        name: "",
        path: "",
        description: "",
        method: ""
    }
}