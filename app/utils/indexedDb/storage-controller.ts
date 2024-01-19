// interface IndexedDBEvents {
//     error: number[]
//     // upgradeneeded: any[]
// }

import { IndexedDBController } from ".";


export class IndexedDBStorageController<Model> {
    controller: IndexedDBController
    storageName: string
    objectStoreParameters: IDBObjectStoreParameters
    constructor(controller: IndexedDBController, storageName: string, objectStoreParameters: IDBObjectStoreParameters) {
        this.controller = controller;
        this.storageName = storageName;
        this.objectStoreParameters = objectStoreParameters;
    }
    _store: IDBObjectStore | null = null;
    get store() {
        const dbThen = this.controller.db
        return dbThen.then(db => {
            if (db.objectStoreNames.contains(this.storageName)) {
                const transaction = db.transaction(this.storageName, "readwrite");
                return transaction.objectStore(this.storageName);
            }
            return db.createObjectStore(this.storageName, this.objectStoreParameters);
        })
    }
    async createIndex(...args: Parameters<IDBObjectStore["createIndex"]>) {
        const storage = await this.store
        return storage.createIndex(...args);
    }
    public async add(data: Model) {
        const storage = await this.store;
        const addRequest = storage.add(data);

        return new Promise<Model>((resolve, reject) => {
            addRequest.addEventListener("success", (event) => {
                resolve(data)
            });
            addRequest.addEventListener("error", (event) => {
                reject(`Error Adding data:${event?.target?.["error"]}}`)
            });
        });
    }
    public async put(...args: Parameters<IDBObjectStore["put"]>) {
        const storage = await this.store;
        const putRequest = storage.put(...args);
        return new Promise((resolve, reject) => {
            putRequest.addEventListener("success", (event) => {
                resolve(putRequest.result);
            });
            putRequest.addEventListener("error", (event) => {
                reject(`Error Putting data:${event?.target?.["error"]}}`)
            });
        });

    }
    public async get(...args: Parameters<IDBObjectStore["get"]>) {
        const storage = await this.store;
        const getRequest = storage.get(...args);
        return new Promise<Model>((resolve, reject) => {
            getRequest.addEventListener("success", (event) => {
                resolve(getRequest.result);
            });
            getRequest.addEventListener("error", (event) => {
                reject(`Error Getting data:${event?.target?.["error"]}}`)
            });
        });
    }
}
