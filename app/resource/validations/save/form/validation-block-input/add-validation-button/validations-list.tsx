import { ValidateAllEnums, getValidateHierarchy } from "@/basic/models/validation/utils";
import { MenuItem } from "@mui/material";
import React, { useState } from "react";

interface IProps<T extends ValidateAllEnums> {
    type?: T
    onChange: (type: ValidateAllEnums) => void
}
export const ValidationsList = React.memo(<T extends ValidateAllEnums>({ type, onChange }: IProps<T>) => {

    return <>
        {getValidateHierarchy(type).map(validateName => {
            return <MenuItem onClick={() => { onChange(validateName) }}>{validateName}</MenuItem>
        })}
    </>;
});
