import { InputTypes, PropertyNameViews } from "@/app/components/object-input/types";
import Joi from "joi";
import { DataTypes } from ".";
import { StringDataType } from "./string";

export const NumberDataType: PropertyNameViews = {
    Min: {
        argValues: [
            {
                type: InputTypes.Number,
                value: 0,
                validate: Joi.number().required()
            }
        ],
        properties: () => NumberDataType,
    },
    Max: {
        argValues: [
            {
                type: InputTypes.Number,
                value: 0,
                validate: Joi.number().required()
            }
        ],
        properties: () => NumberDataType,
    },
    Or: {
        dentFilterAfterChoose: true,
        argProperties: () => DataTypes,
        properties: () => NumberDataType,
    },
    Optional: {
        properties: () => NumberDataType,
    }
}