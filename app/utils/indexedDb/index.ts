import { IndexedDBStorageController } from "./storage-controller";

// interface IDBObjectStoreParameters {
//     autoIncrement?: boolean;
//     keyPath?: string | string[] | null;
// }
export class IndexedDBController {
  request: IDBOpenDBRequest;
  //
  constructor(databaseName: string, version: number) {
    this.request = indexedDB.open(databaseName, version);
  }

  createStorage<
    M,
    P extends IDBObjectStoreParameters = IDBObjectStoreParameters,
  >(storageName: string, objectStoreParameters: P, indexes = {}) {
    return new IndexedDBStorageController<M, P>(
      this,
      storageName,
      objectStoreParameters
    );
  }
  get db() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const { readyState } = this.request;
      console.log("this.request", readyState, this.request);
      if (readyState === "done") {
        resolve(this.request.result);
      }
      this.request.addEventListener("upgradeneeded", async (e) => {
        console.log("upgradeneeded_upgradeneeded");
        resolve(this.request.result);
      });
      this.request.addEventListener("success", (e) => {
        console.log("success_success");
        resolve(this.request.result);
      });
    });
  }
  // public async get<R extends any>(storeName: string, indexName: string, value: any) {
  //     return this.safeDbCall(async (db: IDBDatabase) => {
  //         return new Promise<R>((resolve, reject) => {
  //             const txn = db.transaction(storeName, 'readonly');
  //             const store = txn.objectStore('Contacts');

  //             // get the index from the Object Store
  //             const index = store.index('email');
  //             // query by indexes
  //             let query = index.get(value);

  //             // return the result object on success
  //             query.addEventListener("success", (event) => {
  //                 console.table(query.result);
  //                 resolve(query.result);
  //             });
  //             // handle the error case
  //             query.addEventListener("error", (event) => {
  //                 const msg = `Database query error: ${event.target?.["errorCode"]}`;
  //                 reject(msg);
  //                 console.error(msg);
  //             });

  //             // close the database connection
  //             txn.oncomplete = function () {
  //                 db.close();
  //             };
  //         })
  //     });

  // }
  // public async addTodo(e) {

  // public async add<D>(storeName: string, doc: D) {

  //     // e.preventDefault();
  //     // const newTodo = { title: todoTitle.value, body: todoDesc.value };
  //     return this.safeDbCall((db: IDBDatabase) => {
  //         const table = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });

  //         for (const key in doc) {

  //             table.createIndex(key, key);
  //         }
  //         const transaction = db.transaction([storeName], 'readwrite');
  //         const objectStore = transaction.objectStore(storeName);
  //         const query = objectStore.add(doc);

  //         // handle success case
  //         query.addEventListener("success", (event) => {
  //             console.log(event);
  //         });

  //         // handle the error case
  //         query.addEventListener("error", (event) => {
  //             console.error(`Database query error: ${event.target?.["errorCode"]}`);
  //         });

  //         // close the database once the
  //         // transaction completes
  //         transaction.oncomplete = function () {
  //             db.close();
  //         };
  //     })
  // }
  // public async put<D>(storeName: string, doc: D) {
  //     return this.safeDbCall((db: IDBDatabase) => {
  //         // create a new transaction
  //         console.log("PUT", doc)
  //         const txn = db.transaction(storeName, 'readwrite');

  //         // get the Contacts object store
  //         const store = txn.objectStore(storeName);
  //         //
  //         let query = store.put(doc);

  //         // handle success case
  //         query.addEventListener("success", (event) => {
  //             console.log(event);
  //         });

  //         // handle the error case
  //         query.addEventListener("error", (event) => {
  //             console.error(`Database query error: ${event.target?.["errorCode"]}`);
  //         });

  //         // close the database once the
  //         // transaction completes
  //         txn.oncomplete = function () {
  //             db.close();
  //         };
  //     });
  // const insertContact = (db: IDBDatabase) => {
  //     // create a new transaction
  //     const txn = db.transaction(name, 'readwrite');

  //     // get the Contacts object store
  //     const store = txn.objectStore(name);
  //     //
  //     let query = store.put(doc);

  //     // handle success case
  //     query.addEventListener("success", (event) => {
  //         console.log(event);
  //     });

  //     // handle the error case
  //     query.addEventListener("error", (event) => {
  //         console.error(`Database query error: ${event.target?.["errorCode"]}`);
  //     });

  //     // close the database once the
  //     // transaction completes
  //     txn.oncomplete = function () {
  //         db.close();
  //     };
  // }
  // }

  // }
  // function () {
  //     // check for IndexedDB support
  //     if (!window.indexedDB) {
  //         console.log(`Your browser doesn't support IndexedDB`);
  //         return;
  //     }

  //     // open the CRM database with the version 1
  //     const request = indexedDB.open('CRM', 1);

  //     // create the Contacts object store and indexes
  //     request.onupgradeneeded = (event) => {
  //         let db = event.target.result;

  //         // create the Contacts object store
  //         // with auto-increment id
  //         let store = db.createObjectStore('Contacts', {
  //             autoIncrement: true
  //         });

  //         // create an index on the email property
  //         let index = store.createIndex('email', 'email', {
  //             unique: true
  //         });
  //     };

  //     // handle the error event
  //     request.onerror = (event) => {
  //         console.error(`Database error: ${event.target.errorCode}`);
  //     };

  //     // handle the success event
  //     request.onsuccess = (event) => {
  //         const db = event.target.result;

  //         // insert contacts
  //         insertContact(db, {
  //             email: 'john.doe@outlook.com',
  //             firstName: 'John',
  //             lastName: 'Doe'
  //         });

  //         insertContact(db, {
  //             email: 'jane.doe@gmail.com',
  //             firstName: 'Jane',
  //             lastName: 'Doe'
  //         });

  //         // get contact by id 1
  //         // getContactById(db, 1);

  //         // get contact by email
  //         // getContactByEmail(db, 'jane.doe@gmail.com');

  //         // get all contacts
  //         // getAllContacts(db);

  //         deleteContact(db, 1);

  //     };

  //     function insertContact(db, contact) {
  //         // create a new transaction
  //         const txn = db.transaction('Contacts', 'readwrite');

  //         // get the Contacts object store
  //         const store = txn.objectStore('Contacts');
  //         //
  //         let query = store.put(contact);

  //         // handle success case
  //         query.onsuccess = function (event) {
  //             console.log(event);
  //         };

  //         // handle the error case
  //         query.onerror = function (event) {
  //             console.log(event.target.errorCode);
  //         }

  //         // close the database once the
  //         // transaction completes
  //         txn.oncomplete = function () {
  //             db.close();
  //         };
  //     }

  //     function getContactById(db, id) {
  //         const txn = db.transaction('Contacts', 'readonly');
  //         const store = txn.objectStore('Contacts');

  //         let query = store.get(id);

  //         query.onsuccess = (event) => {
  //             if (!event.target.result) {
  //                 console.log(`The contact with ${id} not found`);
  //             } else {
  //                 console.table(event.target.result);
  //             }
  //         };

  //         query.onerror = (event) => {
  //             console.log(event.target.errorCode);
  //         }

  //         txn.oncomplete = function () {
  //             db.close();
  //         };
  //     };

  //     function getContactByEmail(db, email) {
  //         const txn = db.transaction('Contacts', 'readonly');
  //         const store = txn.objectStore('Contacts');

  //         // get the index from the Object Store
  //         const index = store.index('email');
  //         // query by indexes
  //         let query = index.get(email);

  //         // return the result object on success
  //         query.onsuccess = (event) => {
  //             console.table(query.result); // result objects
  //         };

  //         query.onerror = (event) => {
  //             console.log(event.target.errorCode);
  //         }

  //         // close the database connection
  //         txn.oncomplete = function () {
  //             db.close();
  //         };
  //     }

  //     function getAllContacts(db) {
  //         const txn = db.transaction('Contacts', "readonly");
  //         const objectStore = txn.objectStore('Contacts');

  //         objectStore.openCursor().onsuccess = (event) => {
  //             let cursor = event.target.result;
  //             if (cursor) {
  //                 let contact = cursor.value;
  //                 console.log(contact);
  //                 // continue next record
  //                 cursor.continue();
  //             }
  //         };
  //         // close the database connection
  //         txn.oncomplete = function () {
  //             db.close();
  //         };
  //     }

  //     function deleteContact(db, id) {
  //         // create a new transaction
  //         const txn = db.transaction('Contacts', 'readwrite');

  //         // get the Contacts object store
  //         const store = txn.objectStore('Contacts');
  //         //
  //         let query = store.delete(id);

  //         // handle the success case
  //         query.onsuccess = function (event) {
  //             console.log(event);
  //         };

  //         // handle the error case
  //         query.onerror = function (event) {
  //             console.log(event.target.errorCode);
  //         }

  //         // close the database once the
  //         // transaction completes
  //         txn.oncomplete = function () {
  //             db.close();
  //         };

  //     }
}
