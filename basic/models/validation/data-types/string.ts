import { InputTypes, PropertyNameViews } from "@/app/components/object-input/types";
import Joi from "joi"; 
import { DataTypes } from ".";

export const StringDataType: PropertyNameViews = {
    MinLength: {
        argValues: [
            {
                type: InputTypes.Number,
                value: 0,
                validate: Joi.number().required()
            }
        ],
        properties: () => StringDataType,
    },
    MaxLength: {
        // argValues: () => StringOptions,
        properties: () => StringDataType,
    },
    Or: {
        argValues: () => DataTypes,
        properties: () => StringDataType,
    },
    Optional: {
        // argValues: () => StringOptions,
        properties: () => StringDataType,
    }
}