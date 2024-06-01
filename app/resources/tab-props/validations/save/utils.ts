"use client";
import { IndexedDBController } from "@/app/utils/indexedDb";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { Validation } from "@/db/types";
// import { Validation } from "@/basic/models/validation/validation"


export const getBasicValidationsDoc = (): MakeCreateOrUpdate<Validation> => {
    return {
        // id: Generated<number>;
        // createdAt: Generated<string>;
        // updatedAt: string;
        // deletedAt: string | null;
        // name: string;
        // description: string | null;
        // /**
        //  * @kyselyType(import("../basic/models/validation/validation").ValidationPropertyType)
        //  */
        // validations:

        // updatedAt: "",
        name: "",
        description: "",
        validations: []
    } as const
}


const INDEXED_DB_NAME = "INDEXED_DB_Validation" as const;

const INDEXED_DB_STORY_NAME = `${INDEXED_DB_NAME}_STORY_NAME_1`;
const INDEXED_DB_STORY_DATABASE_NAME = `${INDEXED_DB_STORY_NAME}_DATABASE`;
const INDEXED_DB_STORY_STORAGE_NAME = `${INDEXED_DB_STORY_DATABASE_NAME}_STORAGE`;
export const INDEXED_DB_STORY_VALIDATION_KEY_ID = `${INDEXED_DB_NAME}_ID` as const;

export const getValidationIndexedDBStorage = <D extends any>() => {
    const db = new IndexedDBController(INDEXED_DB_STORY_DATABASE_NAME, 1);
    const params = {
        autoIncrement: true,
        keyPath: INDEXED_DB_STORY_VALIDATION_KEY_ID,
    } as const

    return db.createStorage<MakeCreateOrUpdate<Validation>, typeof params>(INDEXED_DB_STORY_STORAGE_NAME, params);
}

// export const validationStorage = getValidationIndexedDBStorage();