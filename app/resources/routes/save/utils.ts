"use client"
import { IndexedDBController } from "@/app/utils/indexedDb";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema" 
import { Route } from "@/db/types";
import { SaveRouteArgs } from "../schema";
// import { SaveRouteArgs } from "../../../routes/schema";


export const getBasicRouteDoc = (): MakeCreateOrUpdate<SaveRouteArgs> => {
    return {
        name: "",
        path: "",
        description: "",
        method: "GET",
        validations: []
    }
}


const INDEXED_DB_NAME = "INDEXED_DB_ROUTE" as const;

const INDEXED_DB_STORY_NAME = `${INDEXED_DB_NAME}_STORY_NAME_1`;
const INDEXED_DB_STORY_DATABASE_NAME = `${INDEXED_DB_STORY_NAME}_DATABASE`;
const INDEXED_DB_STORY_STORAGE_NAME = `${INDEXED_DB_STORY_DATABASE_NAME}_STORAGE`;
export const INDEXED_DB_STORY_ROUTE_KEY_ID = `${INDEXED_DB_NAME}_ID` as const

export const getRouteIndexedDBStorage = <D extends any>() => {
    const db = new IndexedDBController(INDEXED_DB_STORY_DATABASE_NAME, 1);
    const params = {
        autoIncrement: true,
        keyPath: INDEXED_DB_STORY_ROUTE_KEY_ID,
    } as const

    return db.createStorage<MakeCreateOrUpdate<Route>, typeof params>(INDEXED_DB_STORY_STORAGE_NAME, params);
}

// export const routeStorage = getRouteIndexedDBStorage();