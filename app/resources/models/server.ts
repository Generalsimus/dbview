"use server";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import { validate } from "@/utils";
import { db } from "@/db/init";
// import { SaveRouteArgs, SaveRouteSchema } from "./schema";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/sqlite";
import { Model } from "@/db/types";
import { saveModelSchema } from "./schema";
import { GetKyselyModel } from "@/basic/generics";

type ss = GetKyselyModel<Model>;
export interface SaveModelArgs extends GetKyselyModel<Model> {}
export async function SaveModelDoc(
  value: MakeCreateOrUpdate<SaveModelArgs>
): Promise<void> {
  "use server";
  console.log("🚀 --> value:", value);
  const validateRes = validate(value, getCreateOrUpdateSchema(saveModelSchema));
  if (!validateRes.error) {
    const {
      value: { objectSchema, ...value },
    } = validateRes;

    await db
      .insertInto("Model")
      .values({
        id: value.id ?? undefined,
        name: value.name,
        description: value.description,
        objectSchema: JSON.stringify(objectSchema),
        updatedAt: new Date().toString(),
      })
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          name: value.name,
          description: value.description,
          objectSchema: JSON.stringify(objectSchema),
          updatedAt: new Date().toString(),
        })
      )
      .execute();
  }
}

export async function DeleteModelDoc(id: number): Promise<void> {
  "use server";
  await db.deleteFrom("Model").where("Model.id", "=", id).execute();
}

export async function GetModelDoc(id: number) {
  "use server";

  // return null as any;...........
  const modelDoc = await db
    .selectFrom("Model")
    .selectAll()
    .where("Model.id", "=", id)
    .executeTakeFirst();

  // // if (!routeDoc) return;
  // console.log("🚀 --> GetRouteDoc --> routeDoc:", typeof routeDoc?.validations);
  // // const ss = routeDoc;
  // // const validations = routeDoc.validations;

  return modelDoc;
}

export async function SearchModelByName(
  startIndex: number,
  endIndex: number,
  searchValue?: string
) {
  "use server";
  const [{ count }] = await db
    .selectFrom("Model")
    .select((b) => [b.fn.count<number>("id").as("count")])
    .execute();
  const models = await db
    .selectFrom("Model")
    .selectAll()
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .execute();

  return {
    docs: models,
    maxDocsCount: count,
  }; 
  // await db.deleteFrom("Model").where("Model.id", "=", id).execute();
}
export async function getModelDocs(startIndex: number, endIndex: number) {
  "use server";

  const [{ count }] = await db
    .selectFrom("Model")
    .select((b) => [b.fn.count<number>("id").as("count")])
    .execute();
  const models = await db
    .selectFrom("Model")
    .selectAll()
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .execute();

  return {
    docs: models,
    maxDocsCount: count,
  };
}
