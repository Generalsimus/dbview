// import { Validator } from "@/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import { TextField } from "@mui/material";
import React, { useState } from "react";

// interface IProps {
// }
interface IProps extends InputProps<Service["name"]> {
    // validator: Validator<Service>
}
export const NameInput: React.FC<IProps> = React.memo(({ value, getValidation, initSetProps, getPropState }) => {
    const { getError } = getValidation()

    return <>
        <TextField
            value={value}
            onChange={initSetProps("target", "value")()}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            {...getError("name")}
        />
    </>;
});
