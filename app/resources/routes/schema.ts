import {
  getCreateOrUpdateSchema,
  getDbDocSchema,
  MakeAsDbDoc,
} from "@/basic/db-basic-schema";
import { GetKyselyModel, PartialBy, SetValue } from "@/basic/generics";
// import { RouteSchema } from "@/basic/models/route/route";
import { Model, Route } from "@/db/types";
import Joi from "joi";
import { saveModelSchema } from "../models/schema";

export const requestMethods: Route["method"][] = ["GET", "POST", "DELETE", "PUT"];

export const RouteSchema = Joi.object<Route>({
  name: Joi.string().required(),
  path: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  method: Joi.string().valid(...requestMethods).required(),

})



export type SaveRouteArgs = SetValue<
  GetKyselyModel<Route>,
  "validations",
  PartialBy<GetKyselyModel<Model>, "createdAt" | "updatedAt" | "deletedAt">[]
>;

export const SaveRouteSchema = getCreateOrUpdateSchema(
  RouteSchema.append<SaveRouteArgs>({
    validations: Joi.array().items(getDbDocSchema(saveModelSchema)).required(),
  })
);
