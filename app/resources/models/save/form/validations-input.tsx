import React from "react";
import { InputProps, PartialKeys } from "@/utils/generics";
import { ObjectInput } from "@/app/components/object-input"; 
import { PropertyType } from "@/app/components/object-input/types";
import { DataTypes } from "@/app/components/object-input/schema/data-types";




interface IProps extends InputProps<PartialKeys<PropertyType, "value">[]> {
}
export const ValidationsInput: React.FC<IProps> = React.memo(({ value = [], setValue }) => {

    return <>
        <ObjectInput value={value} onChange={setValue} optionalValue={DataTypes} />
    </>
});