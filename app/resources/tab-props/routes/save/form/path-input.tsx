import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { InputProps } from "@/basic/generics"
import { Route } from "@/db/types"
// import { Route } from "@/basic/models/route/route"
import { TextField } from "@mui/material"
import React from "react"

interface IProps extends InputProps<Route["name"]> {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
}
export const PathInput: React.FC<IProps> = React.memo(({ value, validation, initSetProps, getPropState }) => {
    const { getError } = validation


    return <TextField
        autoFocus
        margin="dense"
        id="path"
        name="path"
        value={value}
        onChange={initSetProps("target", "value")()}
        label="Path"
        type="text"
        fullWidth
        variant="outlined"
        {...getError("path")}
    />
})