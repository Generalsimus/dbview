import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { InputProps } from "@/basic/generics"
import { Route } from "@/db/types"
// import { Route } from "@/basic/models/route/route"
import { TextField } from "@mui/material"
import React from "react"

interface IProps extends InputProps<Route["description"]> {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
}
export const DescriptionInput: React.FC<IProps> = React.memo(({ value, validation, initSetProps, getPropState }) => {
    const { getError } = validation


    return <TextField
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
        variant="outlined"
        multiline
        {...getError("description")}
    />
})