import { InputProps } from "@/basic/generics";
import { Service } from "@/db/types";
import { TextField } from "@mui/material";
import React, { useState } from "react";

interface IProps extends InputProps<Service["description"]> {
}
export const DescriptionInput: React.FC<IProps> = React.memo(({ value, getValidation, initSetProps, getPropState }) => {
    const { getError } = getValidation()
    return <>

        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            name="description"
            value={value}
            onChange={initSetProps("target", "value")()}
            minRows={2}
            type="text"
            fullWidth
            variant="filled"
            multiline
            {...getError("description")}
        />
    </>;
});
