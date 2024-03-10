// import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { DeepPartial, InputProps, PartialKeys } from "@/basic/generics";
import { Validation } from "@/basic/models/validation/validation";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ValidationsInput } from "./validations-input";
// import { StateValueType } from "../modal";
import { PropertyType } from "@/app/components/object-input/types";
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema";
// SetPropsRes<MakeCreateOrUpdate<Validation>>
export interface StateValueType extends Omit<MakeCreateOrUpdate<Validation>, "validations"> {
    validations: PartialKeys<PropertyType, "value">[]
}
interface IProps extends InputProps<StateValueType> {
    // validator: Validator<StateValueType>
}
export const Form: React.FC<IProps> = React.memo(({ value = {}, getValidation, initSetProps, getPropState }) => {
    const { name, description } = value
    const { getError } = getValidation()

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
