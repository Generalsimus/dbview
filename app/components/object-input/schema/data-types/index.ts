import { PropertyNameViews } from "@/app/components/object-input/types";
import { StringDataType } from "./string";
import { NumberDataType } from "./number";

export const DataTypes: PropertyNameViews = {
    Number: {
        // argValues: () => StringOptions,
        dentFilterProperties: true,
        properties: () => NumberDataType,
    },
    String: {
        // argValues: () => StringOptions,
        dentFilterProperties: true,
        properties: () => StringDataType,
    },
}