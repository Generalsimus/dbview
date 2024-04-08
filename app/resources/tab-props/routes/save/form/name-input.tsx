import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { InputProps } from "@/basic/generics"
import { Route } from "@/basic/models/route/route"
import { TextField } from "@mui/material"
import React from "react"

interface IProps extends InputProps<Route["name"]> {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
    // validator: Validator<Service>
}
export const NameInput: React.FC<IProps> = React.memo(({ value, validation, initSetProps, getPropState }) => {
    const { getError } = validation


    return <TextField
        value={name}
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
})