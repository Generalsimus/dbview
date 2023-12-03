import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { InputProps, PartialKeys } from "@/basic/generics"; 
import { ObjectInput } from "@/app/components/object-input";
import { DataTypes } from "@/basic/models/validation/data-types";
import { PropertyType } from "@/app/components/object-input/types";
 





// interface IProps<V = PartialKeys<PropertyType, "value">> {
//     value?: V[],
//     onChange: (newValue: V[]) => void
// }
interface IProps extends InputProps<PropertyType[]> {
    // validator: Validator<Validation>
}
export const ValidationsInput: React.FC<IProps> = React.memo(({ value = [], setValue }) => {

    return <>
        <ObjectInput value={value} onChange={setValue} optionalValue={DataTypes} />
    </>
});