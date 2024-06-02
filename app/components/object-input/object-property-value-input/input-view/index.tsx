import React, { useState } from "react";
import { ValueTypes, InputTypes, ArgValueType } from "../../types";
import { Number } from "./number";
import { String } from "./string";
import { Select } from "./select";
import { JoiSchemaValue } from "@/utils/generics";

// export type InputValue<T extends ValueTypes> = T extends any ? T & {
//     value?: JoiSchemaValue<T["validate"]>,
//     onChange: (newValue: ArgValueType) => void
// } : never



type IProps = ValueTypes & {
    onChange: (newValue: ArgValueType) => void
}

export const InputsView: React.FC<IProps> = React.memo((props) => {

    // console.log(value.type, value)
    switch (props.type) {
        case InputTypes.Number:
            return <Number {...props} />
        case InputTypes.String:
            return <String {...props} />
        case InputTypes.Select:
            return <Select  {...props} />
        default:
            throw new Error("Input Type Does Not Exist!")
    }
    return <></>
});
