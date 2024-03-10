// interface IndexedDBEvents {
// autoIncrement?: boolean;
// keyPath?: string | string[] | null;
// }

import { IndexedDBController } from ".";

type GetModelDoc<M, Params extends IDBObjectStoreParameters> = Params extends {
  autoIncrement: true;
  keyPath: `${infer KeyName}`;
}
  ? M & Record<KeyName, number>
  : M;

export class IndexedDBStorageController<
  Model,
  P extends IDBObjectStoreParameters = IDBObjectStoreParameters,
> {
  controller: IndexedDBController;
  storageName: string;
  objectStoreParameters: P;
  constructor(
    controller: IndexedDBController,
    storageName: string,
    objectStoreParameters: P
  ) {
    this.controller = controller;
    this.storageName = storageName;
    this.objectStoreParameters = objectStoreParameters;
    this.store;
  }
  _store: IDBObjectStore | null = null;
  get store() {
    const dbThen = this.controller.db;
    return dbThen.then((db) => {
      console.log(
        "db.objectStoreNames.",
        this.storageName,
        db.objectStoreNames
      );
      if (db.objectStoreNames.contains(this.storageName)) {
        const transaction = db.transaction(this.storageName, "readwrite");
        return transaction.objectStore(this.storageName);
      }
      return db.createObjectStore(this.storageName, this.objectStoreParameters);
    });
  }
  async createIndex(...args: Parameters<IDBObjectStore["createIndex"]>) {
    const storage = await this.store;
    return storage.createIndex(...args);
  }
  public async add(data: Model) {
    const storage = await this.store;
    const addRequest = storage.add(data);

    return new Promise<GetModelDoc<Model, P>>((resolve, reject) => {
      addRequest.addEventListener("success", async (event) => {
        this.get(event?.["target"]?.["result"])
          .then((e) => {
            if (e !== undefined) {
              resolve(e);
            }
            reject();
          })
          .catch(reject);
      });
      addRequest.addEventListener("error", (event) => {
        reject(`Error Adding data:${event?.target?.["error"]}}`);
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
        reject(`Error Putting data:${event?.target?.["error"]}}`);
      });
    });
  }
  public async get(...args: Parameters<IDBObjectStore["get"]>) {
    const storage = await this.store;
    const getRequest = storage.get(...args);
    return new Promise<GetModelDoc<Model, P> | undefined>((resolve, reject) => {
      getRequest.addEventListener("success", (event) => {
        resolve(getRequest.result);
      });
      getRequest.addEventListener("error", (event) => {
        reject(`Error Getting data:${event?.target?.["error"]}}`);
      });
    });
  }
  public async getAll(...args: Parameters<IDBObjectStore["getAll"]>) {
    const storage = await this.store;
    const getRequest = storage.getAll(...args);
    return new Promise<GetModelDoc<Model, P>[] | undefined>((resolve, reject) => {
      getRequest.addEventListener("success", (event) => {
        resolve(getRequest.result);
      });
      getRequest.addEventListener("error", (event) => {
        reject(`Error Getting data:${event?.target?.["error"]}}`);
      });
    });
  }
  public async delete(...args: Parameters<IDBObjectStore["delete"]>) {
    const storage = await this.store;
    const getRequest = storage.delete(...args);
    return new Promise<void>((resolve, reject) => {
      getRequest.addEventListener("success", (event) => {
        resolve(getRequest.result);
      });
      getRequest.addEventListener("error", (event) => {
        reject(`Error Getting data:${event?.target?.["error"]}}`);
      });
    });
  }
  //
}
