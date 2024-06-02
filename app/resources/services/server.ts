"use server";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/utils/db-basic-schema";
import { validate } from "@/utils";
import { db } from "@/db/init";
import { Service } from "@/db/types";
import { saveServiceSchema } from "./schema";
import { GetKyselyModel } from "@/utils/generics";

export interface SaveServiceArgs extends GetKyselyModel<Service> { }
export async function SaveServiceDoc(
  value: MakeCreateOrUpdate<SaveServiceArgs>
): Promise<void> {
  "use server";
  console.log("🚀 --> value:", value);
  const validateRes = validate(
    value,
    getCreateOrUpdateSchema(saveServiceSchema)
  );
  if (!validateRes.error) {
    const { value } = validateRes;

    await db
      .insertInto("Service")
      .values({
        id: value.id ?? undefined,
        name: value.name,
        description: value.description,
        methods: JSON.stringify(value.methods),
        updatedAt: new Date().toString(),
      })
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          name: value.name,
          description: value.description,
          methods: JSON.stringify(value.methods),
          updatedAt: new Date().toString(),
        })
      )
      .execute();
  }
}

export async function DeleteServiceDoc(id: number): Promise<void> {
  "use server";
  await db.deleteFrom("Service").where("Service.id", "=", id).execute();
}

export async function GetServiceDoc(id: number) {
  "use server";

  // return null as any;...........
  const modelDoc = await db
    .selectFrom("Service")
    .selectAll()
    .where("Service.id", "=", id)
    .executeTakeFirst();


  return modelDoc;
}

export async function getServiceDocs(startIndex: number, endIndex: number) {
  "use server";

  const [{ count }] = await db
    .selectFrom("Service")
    .select((b) => [b.fn.count<number>("id").as("count")])
    .execute();
  const models = await db
    .selectFrom("Service")
    .selectAll()
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .orderBy("Service.createdAt", "desc")
    .execute();

  return {
    docs: models,
    maxDocsCount: count,
  };
}
