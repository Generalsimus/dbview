import { ValidationRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller"
import { MakeCreateOrUpdate } from "@/basic/db-basic-schema"
import { InputProps } from "@/basic/generics"
import { Route } from "@/basic/models/route/route"
import { requestMethods, RequestTypeEnum } from "@/basic/types"
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import React from "react"

interface IProps extends InputProps<Route["method"]> {
    validation: ValidationRes<MakeCreateOrUpdate<Route>>
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
            onChange={initSetProps("target", "value")()}
            {...getError("method")}
        >
            {requestMethods.map((method: RequestTypeEnum) => {
                return <MenuItem key={method} value={method}>{method}</MenuItem>
            })}
        </Select>
    </FormControl>
})