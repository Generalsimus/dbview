import React, { useState } from "react";
import { ValueTypes, InputTypes } from "../../types";
import { Number } from "./number";
import { String } from "./string";
import { Select } from "./select";


interface IProps {
    value: ValueTypes
    onChange: (newValue: ValueTypes) => void
}
export const InputsView: React.FC<IProps> = React.memo(({ value, onChange }) => {

    console.log(value.type, value)
    switch (value.type) {
        case InputTypes.Number:
            return <Number value={value} onChange={onChange} />
        case InputTypes.String:
            return <String value={value} onChange={onChange} />
        case InputTypes.Select:
            return <Select value={value} onChange={onChange} />
        default:
            throw new Error("Input Type Does Not Exist!")
    }
    return <></>
});
