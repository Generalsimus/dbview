import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Model = {
    id: Generated<number>;
    createdAt: Generated<string>;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string | null;
    /**
     * @kyselyType(import("kysely").JSONColumnType<import("../basic/models/validation/validation").ValidationPropertyType>)
     */
    objectSchema: import("kysely").JSONColumnType<import("../basic/models/validation/validation").ValidationPropertyType>;
};
export type ProjectSettings = {
    id: Generated<number>;
    createdAt: Generated<string>;
    updatedAt: string;
    deletedAt: string | null;
    /**
     * @kyselyType('TypeScript' | 'JavaScript')
     */
    backEndLanguage: 'TypeScript' | 'JavaScript' | null;
    backEndBuildDirection: string | null;
    frontEndBuildDirection: string | null;
};
export type Route = {
    id: Generated<number>;
    createdAt: Generated<string>;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    path: string;
    /**
     * @kyselyType('GET' | 'POST'| 'DELETE'| 'PUT')
     */
    method: 'GET' | 'POST'| 'DELETE'| 'PUT';
    description: string | null;
};
export type RouteValidations = {
    createdAt: Generated<string>;
    deletedAt: string | null;
    routeId: number;
    modelsId: number;
};
export type Service = {
    id: Generated<number>;
    createdAt: Generated<string>;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string | null;
    /**
     * @kyselyType(import("kysely").JSONColumnType<import("../basic/models/services/services").ServiceMethod[]>)
     */
    methods: import("kysely").JSONColumnType<import("../basic/models/services/services").ServiceMethod[]>;
};
export type DB = {
    Model: Model;
    ProjectSettings: ProjectSettings;
    Route: Route;
    RouteValidations: RouteValidations;
    Service: Service;
};
