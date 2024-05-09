"use server";
import { RouteModel } from "@/db/models/route";
import { buildRoute } from "@/app/builder/route";
import {
  MakeCreateOrUpdate,
  getCreateOrUpdateSchema,
} from "@/basic/db-basic-schema";
// import { 
//   SaveRoute,
//   SaveRouteSchema,
// } from "@/basic/models/route/types";
import { validate } from "@/utils";
import { ValidationModel } from "@/db/models/validation";
import { Route, RouteSchema } from "@/basic/models/route/route";
// import { RouteSchema } from "@/basic/models/user/user";

export async function SaveRouteDoc(
  value: MakeCreateOrUpdate<Route>
): Promise<void> {
  "use server";
  const validateRes = validate(value, getCreateOrUpdateSchema(RouteSchema));

  if (!validateRes.error) {
    const {
      value: { validations, ...value },
    } = validateRes;
    // console.log("🚀 --> SaveRouteDoc --> value:", validations);

    const [instance, created] = await RouteModel.upsert(value);
    // await instance.setValidations([]);
    await instance.setValidations(validations.map((el) => el.id), { force: true });
    console.log(
      "🚀 --> validations.map((el) => el.id):",
      validations.map((el) => el.id)
    );

    // await instance.setValidations(value.validations, {})
    // await instance.update({ validations: value.validations })
    // instance.
    // instance.belongsTo()
    // .ad(value.validations[0]);
    // await Promise.all(value.validations.map(async (el) => {
    //     const validation = await ValidationModel.upsert(el);
    //     await instance.addValidation(validation, { through: { selfGranted: false } });
    // }))
    // instance.belongsToMany(created)
    // Player.belongsTo(Team);
    // validateRes.addRefe
    buildRoute({
      ...instance.dataValues,
      validations: await instance.getValidations({ raw: true })
    });
  }
}

export async function DeleteRouteDoc(id: number): Promise<void> {
  "use server";
  if (typeof id === "number") {
    await RouteModel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export async function getRouteDocs(startIndex: number, endIndex: number) {
  "use server";
  const { rows, count } = await RouteModel.findAndCountAll({
    where: {},
    order: [["createdAt", "DESC"]],
    include: {
      model: ValidationModel,
    },
    limit: endIndex - startIndex,
    offset: startIndex,
  } as const);
  const docs: Route[] = rows.map((el) => {
    return {
      validations: [],
      ...el.toJSON(),
    };
  });

  return {
    docs: docs,
    maxDocsCount: count,
  };
}
