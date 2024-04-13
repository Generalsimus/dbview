"use client"
import { IndexedDBController } from "@/app/utils/indexedDb";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { Route } from "@/basic/models/route/route"
import { GetRoute, SaveRoute } from "@/basic/models/route/types";
import { RequestTypeEnum } from "@/basic/types";


export const getBasicRouteDoc = (): MakeCreateOrUpdate<SaveRoute> => {
    return {
        name: "",
        path: "",
        description: "",
        method: RequestTypeEnum.GET,
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

    return db.createStorage<MakeCreateOrUpdate<GetRoute>, typeof params>(INDEXED_DB_STORY_STORAGE_NAME, params);
}

// export const routeStorage = getRouteIndexedDBStorage();