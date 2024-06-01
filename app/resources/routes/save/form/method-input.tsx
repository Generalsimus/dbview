import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { InputProps } from "@/basic/generics"
import { requestMethods } from "@/basic/models/route/route"
// import { Route } from "@/basic/models/route/route"
// import { requestMethods, RequestTypeEnum } from "@/basic/types"
import { Route } from "@/db/types"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React from "react"
import { SaveRouteArgs } from "../../schema"

interface IProps extends InputProps<SaveRouteArgs["method"]> {
    validation: ValidationRes<MakeCreateOrUpdate<SaveRouteArgs>>
}
export const MethodInput: React.FC<IProps> = React.memo(({ value, validation, initSetProps, getPropState }) => {
    const { getError } = validation


    return <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label">Method</InputLabel>
        <Select
            labelId="method"
            id="method"
            fullWidth
            name="method"
            value={value}
            label="Method"
            variant="outlined"
            onChange={initSetProps("target", "value")() as any}
            {...getError("method")}
        >
            {requestMethods.map((method) => {
                return <MenuItem key={method} value={method}>{method}</MenuItem>
            })}
        </Select>
    </FormControl>
})