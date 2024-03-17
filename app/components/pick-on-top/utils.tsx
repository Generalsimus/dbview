// import { IndexedDBController } from "@/utils/indexedDb";

import { IndexedDBController } from "@/app/resources/utils/indexedDb";

export const getFullPath = () =>
  `${window.location.pathname}${window.location.search}`;
export interface PickOnTopStoredDoc {
  title: string;
  path: string;
}
const INDEXED_DB_NAME = "INDEXED_DB_PICK" as const;

const INDEXED_DB_STORY_NAME = `${INDEXED_DB_NAME}_STORY_NAME_1`;
const INDEXED_DB_STORY_DATABASE_NAME = `${INDEXED_DB_STORY_NAME}_DATABASE`;
const INDEXED_DB_STORY_STORAGE_NAME = `${INDEXED_DB_STORY_DATABASE_NAME}_STORAGE`;

export const getPIckOnTopIndexedDBStorage = <D extends any>() => {
  const db = new IndexedDBController(INDEXED_DB_STORY_DATABASE_NAME, 1);
  const params = {
    autoIncrement: true,
    keyPath: `${INDEXED_DB_NAME}_ID` as const,
  } as const;
  //   console.log("SSSSSSasaaaa");
  return db.createStorage<PickOnTopStoredDoc, typeof params>(
    INDEXED_DB_STORY_STORAGE_NAME,
    params
  );
};

export const pIckOnTopIndexedDBStorage = getPIckOnTopIndexedDBStorage();
