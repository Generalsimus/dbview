"use server";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
import { validate } from "@/utils";
import { db } from "@/db/init";
import { SaveRouteArgs, SaveRouteSchema } from "../../routes/schema";

// ValidationSchema
export async function SaveRouteDoc(
  value: MakeCreateOrUpdate<SaveRouteArgs>
): Promise<void> {
  "use server";

  const validateRes = validate(value, getCreateOrUpdateSchema(SaveRouteSchema));
  if (!validateRes.error) {
    const {
      value: { validations, ...value },
    } = validateRes;

    db.insertInto("Route")
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
      );
  }
  // id        Int       @id @default(autoincrement())
  // createdAt DateTime  @default(now())
  // updatedAt DateTime  @updatedAt
  // deletedAt DateTime?

  // name String
  // path String

  // /// @kyselyType('GET' | 'POST'| 'DELETE'| 'PUT')
  // method           String
  // description      String?
  // routeValidations RouteValidations[]
  // const validateRes = validate(value, getCreateOrUpdateSchema(RouteSchema));

  // if (!validateRes.error) {
  //   const {
  //     value: { validations, ...value },
  //   } = validateRes;

  //   const [instance, created] = await RouteModel.upsert(value);

  //   await instance.setValidations(validations.map((el) => el.id), { force: true });

  //   const builder = await getBuilder();

  //   builder?.buildRoute({
  //     ...instance.dataValues,
  //     validations: await instance.getValidations({ raw: true })
  //   });
  // }
}

export async function DeleteRouteDoc(id: number): Promise<void> {
  "use server";
  // if (typeof id === "number") {
  //   await RouteModel.destroy({
  //     where: {
  //       id: id,
  //     },
  //   });
  // }
}

export async function getRouteDocs(startIndex: number, endIndex: number) {
  "use server";
  // const { rows, count } = await RouteModel.findAndCountAll({
  //   where: {},
  //   order: [["createdAt", "DESC"]],
  //   include: {
  //     model: ValidationModel,
  //   },
  //   limit: endIndex - startIndex,
  //   offset: startIndex,
  // } as const);
  // const docs: Route[] = rows.map((el) => {
  //   return {
  //     validations: [],
  //     ...el.toJSON(),
  //   };
  // });

  return {
    docs: [],
    maxDocsCount: 0,
  };
}
