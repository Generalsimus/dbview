import {
  getCreateOrUpdateSchema,
  getDbDocSchema,
  MakeAsDbDoc,
} from "@/basic/db-basic-schema";
import {   PartialBy, SetValue } from "@/basic/generics";
import { RouteSchema } from "@/basic/models/route/route";
import { ValidationSchema } from "@/basic/models/validation/validation";
import { Route, Validation } from "@/db/types";
import Joi from "joi";

export type SaveRouteArgs = SetValue<
  Route,
  "validations",
  PartialBy<MakeAsDbDoc<Validation>, "createdAt" | "updatedAt" | "deletedAt">[]
>;

export const SaveRouteSchema = getCreateOrUpdateSchema(
  RouteSchema.append<SaveRouteArgs>({
    validations: Joi.array().items(getDbDocSchema(ValidationSchema)).required(),
  })
);
