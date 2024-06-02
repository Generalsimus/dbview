import { PropertyType } from "@/app/components/object-input/types";
import { CreateObjectValidationSchema } from "@/app/components/object-input/utils";
import { DataTypes } from "./data-types";

export type ValidationPropertyType = PropertyType[];
export const ValidationPropertySchema = CreateObjectValidationSchema(DataTypes);
