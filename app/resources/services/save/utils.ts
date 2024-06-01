"use client";
import { IndexedDBController } from "@/app/utils/indexedDb";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
import { Service } from "@/db/types";
import { SaveServiceArgs } from "../server";
// import { Service } from "@/basic/models/services/services";

export const getBasicServiceDoc = (): MakeCreateOrUpdate<SaveServiceArgs> => {
  return {
    id: undefined,
    name: "",
    description: "",
    methods: [],
  } as const;
};

const INDEXED_DB_NAME = "INDEXED_DB_SERVICE" as const;

const INDEXED_DB_STORY_NAME = `${INDEXED_DB_NAME}_STORY_NAME_1`;
const INDEXED_DB_STORY_DATABASE_NAME = `${INDEXED_DB_STORY_NAME}_DATABASE`;
const INDEXED_DB_STORY_STORAGE_NAME = `${INDEXED_DB_STORY_DATABASE_NAME}_STORAGE`;
export const INDEXED_DB_STORY_SERVICE_KEY_ID = `${INDEXED_DB_NAME}_ID` as const;

export const getServicesIndexedDBStorage = <D extends any>() => {
  const db = new IndexedDBController(INDEXED_DB_STORY_DATABASE_NAME, 1);
  const params = {
    autoIncrement: true,
    keyPath: INDEXED_DB_STORY_SERVICE_KEY_ID,
  } as const;
  //    </D> console.log("SSSSSSasaaaa")
  return db.createStorage<MakeCreateOrUpdate<Service>, typeof params>(
    INDEXED_DB_STORY_STORAGE_NAME,
    params
  );
};

// export const serviceStorage = getServicesIndexedDBStorage();
