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
        argValues: [
            {
                type: InputTypes.Number,
                value: 0,
                validate: Joi.number().required()
            }
        ],
        properties: () => StringDataType,
    },
    RegExp: {
        argValues: [
            {
                type: InputTypes.Select,
                options: [
                    {
                        label: "Mail",
                        value: "/#asd,as,/gm"
                    }, {
                        label: "UUID",
                        value: "/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i"
                    }
                ],
                // options: {
                //     Mail:"/regexp/gm"
                // },
                // value: 0,
                validate: Joi.number().required()
            }
        ],
        properties: () => StringDataType,
    },
    Or: {
        dentFilterAfterChoose: true,
        argProperties: () => DataTypes,
        properties: () => StringDataType,
    },
    Optional: {
        // argValues: () => StringOptions,
        properties: () => StringDataType,
    }
}