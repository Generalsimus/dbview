import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import { TextField } from "@mui/material";
import React, { useState } from "react";

interface IProps extends InputProps<Service["description"]> {
    validator: Validator<Service>
}
export const DescriptionInput: React.FC<IProps> = React.memo(({ value, validator: { getError }, initSetProps, getPropState  }) => {

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
