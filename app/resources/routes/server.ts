"use server";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/utils/db-basic-schema";
import { validate } from "@/utils";
import { db } from "@/db/init";
import { SaveRouteArgs, SaveRouteSchema } from "./schema";
import { jsonArrayFrom } from "kysely/helpers/sqlite";

export async function SaveRouteDoc(
  value: MakeCreateOrUpdate<SaveRouteArgs>
): Promise<void> {
  "use server";
  const validateRes = validate(value, getCreateOrUpdateSchema(SaveRouteSchema));
  if (!validateRes.error) {
    const {
      value: { validations, ...value },
    } = validateRes;

    const doc = await db
      .insertInto("Route")
      .values({
        id: value.id ?? undefined,
        name: value.name,
        path: value.path,
        method: value.method,
        description: value.description,
        updatedAt: new Date().toString(),
      })
      .onConflict((oc) =>
        oc.column("id").doUpdateSet({
          name: value.name,
          path: value.path,
          method: value.method,
          description: value.description,
          updatedAt: new Date().toString(),
        })
      )
      .returningAll()
      .executeTakeFirst();


    if (doc) {
      await db
        .insertInto("RouteValidations")
        .values(validations.map(validation => {
          return {
            routeId: doc.id,
            modelsId: validation.id
          }
        })
        ).onConflict((oc) => oc
          .column("routeId")
          .column("modelsId")
          .doNothing()
        )
        .execute();

      const validationIds = validations.map(validation => validation.id);

      await db.deleteFrom("RouteValidations")
        .where(({ eb, or, and, not, exists, selectFrom }) => and([
          eb("RouteValidations.routeId", '=', doc.id),
          not(eb("RouteValidations.modelsId", "in", validationIds))
        ]))
        .execute();
    }
  }
}

export async function DeleteRouteDoc(id: number): Promise<void> {
  "use server";
  await db.deleteFrom("Route").where("Route.id", "=", id).execute();
}

export async function GetRouteDoc(id: number) {
  "use server";
  const routeDoc = await db
    .selectFrom("Route")
    .selectAll()
    .select((eb) => {
      return [
        jsonArrayFrom(
          eb
            .selectFrom("Model")
            .leftJoin(
              "RouteValidations",
              "Model.id",
              "RouteValidations.modelsId"
            )
            .whereRef("RouteValidations.routeId", "=", "Route.id")
            .select([
              "Model.id",
              "Model.name",
              "Model.description",
              "Model.objectSchema",
              "Model.createdAt",
              "Model.deletedAt",
            ])
        ).as("validations"),
      ];
    })
    .where("Route.id", "=", id)
    .orderBy("Route.createdAt", "asc")
    .executeTakeFirst();


  return routeDoc;
}

export async function getRouteDocs(startIndex: number, endIndex: number) {
  "use server";

  const [{ count }] = await db
    .selectFrom("Route")
    .select((b) => [b.fn.count<number>("id").as("count")])
    .execute();
  const routes = await db
    .selectFrom("Route")
    .selectAll()
    .select((eb) => {
      return [
        jsonArrayFrom(
          eb
            .selectFrom("Model")
            .leftJoin(
              "RouteValidations",
              "Model.id",
              "RouteValidations.modelsId"
            )
            .whereRef("RouteValidations.routeId", "=", "Route.id")
            .select([
              "Model.id",
              "Model.name",
              "Model.description",
              "Model.objectSchema",
              "Model.createdAt",
              "Model.deletedAt",
            ])
        ).as("validations"),
      ];
    })
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .orderBy("Route.createdAt", "desc")
    .execute();

  return {
    docs: routes,
    maxDocsCount: count,
  };
}
