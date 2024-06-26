import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/utils/db-basic-schema"
import { InputProps } from "@/utils/generics"
import { Route } from "@/db/types"
// import { eRoute } from "@/basic/models/route/route"
import { TextField } from "@mui/material"
import React from "react"
import { SaveRouteArgs } from "../../schema"

interface IProps extends InputProps<SaveRouteArgs["name"]> {
    validation: ValidationRes<MakeCreateOrUpdate<SaveRouteArgs>>
    // validator: Validator<Service>
}
export const NameInput: React.FC<IProps> = React.memo(({ value, validation, initSetProps, getPropState }) => {
    const { getError } = validation


    return <TextField
        value={value}
        onChange={initSetProps("target", "value")()}
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        
        type="text"
        fullWidth
        variant="outlined"
        {...getError("name")}
    />
})