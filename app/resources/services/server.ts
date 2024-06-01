"use server";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import { validate } from "@/utils";
import { db } from "@/db/init";
import { Service } from "@/db/types";
import { saveServiceSchema } from "./schema";
import { GetKyselyModel } from "@/basic/generics";

export interface SaveServiceArgs extends GetKyselyModel<Service> {}
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
  await db.deleteFrom("Model").where("Model.id", "=", id).execute();
}

export async function GetServiceDoc(id: number) {
  "use server";

  // return null as any;...........
  const modelDoc = await db
    .selectFrom("Service")
    .selectAll()
    //   .select((eb) => {
    //     return [
    //       jsonArrayFrom(
    //         eb
    //           .selectFrom("Validation")
    //           .leftJoin(
    //             "RouteValidations",
    //             "Validation.id",
    //             "RouteValidations.validationId"
    //           )
    //           .whereRef("RouteValidations.routeId", "=", "Route.id")
    //           .select([
    //             "Validation.id",
    //             "Validation.name",
    //             "Validation.description",
    //             "Validation.validations",
    //             "Validation.createdAt",
    //             "Validation.deletedAt",
    //           ])
    //       ).as("validations"),
    //     ];
    //   })
    .where("Service.id", "=", id)
    .executeTakeFirst();

  // // if (!routeDoc) return;
  // console.log("🚀 --> GetRouteDoc --> routeDoc:", typeof routeDoc?.validations);
  // // const ss = routeDoc;
  // // const validations = routeDoc.validations;

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
    /////////////
    // .select((eb) => [
    //   // pets
    //   // jsonArrayFrom(
    //   //   eb
    //   //     .selectFrom("pet")
    //   //     .select(["pet.id", "pet.name"])
    //   //     .whereRef("pet.owner_id", "=", "person.id")
    //   //     .orderBy("pet.name")
    //   // ).as("pets"),

    //   // mother
    //   jsonObjectFrom(
    //     eb
    //       .selectFrom("person as mother")
    //       .select(["mother.id", "mother.first_name"])
    //       .whereRef("mother.id", "=", "person.mother_id")
    //   ).as("mother"),
    // ])

    //////////////
    .offset(startIndex)
    .limit(endIndex - startIndex)

    .execute();
  // console.log("🚀 --> getModelDocs --> models:", models);

  return {
    docs: models,
    maxDocsCount: count,
  };
}
