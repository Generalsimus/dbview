import React from "react";
import { InputProps, PartialKeys } from "@/basic/generics";
import { ObjectInput } from "@/app/components/object-input";
import { DataTypes } from "@/basic/models/validation/data-types";
import { PropertyType } from "@/app/components/object-input/types";




interface IProps extends InputProps<PartialKeys<PropertyType, "value">[]> {
}
export const ValidationsInput: React.FC<IProps> = React.memo(({ value = [], setValue }) => {

    return <>
        <ObjectInput value={value} onChange={setValue} optionalValue={DataTypes} />
    </>
});