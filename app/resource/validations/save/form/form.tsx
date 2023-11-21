import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Validation } from "@/basic/models/validation/validation";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ValidationsInput } from "./validations-input";

interface IProps extends InputProps<Validation> {
    validator: Validator<Validation>
}
export const ValidationForm: React.FC<IProps> = React.memo(({ value = {}, validator: { getError }, initSetProps, getPropState }) => {
    const { name, description } = value
    return <>

        <TextField
            value={name}
            onChange={initSetProps("target", "value")("name")}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="filled"
            {...getError("name")}
        />
        <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            name="description"
            value={description}
            onChange={initSetProps("target", "value")("description")}
            minRows={2}
            type="text"
            fullWidth
            variant="filled"
            multiline
            {...getError("description")}
        />
        <ValidationsInput {...getPropState("validations")} />
    </>;
});
