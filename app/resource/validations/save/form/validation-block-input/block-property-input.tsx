// import { useChangeSetProps, useMemoCall, useSetProps } from "@/app/utils/hooks";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputProps, MakeStateValue, OptionalKeys } from "@/basic/generics";
import { PropertyNameInput } from "./property-name=input";
import { AddValidationButton } from "./add-validation-button";
import { ValidateValueType } from "@/basic/models/validation/data-types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";

interface IProps extends InputProps<ValidationPropertyType> {
    onRemove: (name: ValidationPropertyType["property"]) => void,
}
export const BlockPropertyInput: React.FC<IProps> = React.memo((props) => {
    const { setValue, onRemove, value = {} } = props;

    const onRemoveHandler = useMemoCall(() => {
        onRemove(value.property + "")
    });
    const onChangeMiddleware = useMemoCall((newValue: IProps["value"] = {}) => {
        const { property = "", value: propertyValue = {} } = newValue || {};
        // console.log({ property })
        if (property.length !== 0) {
            setValue(newValue)
            return
        }
        for (const key in propertyValue) {
            setValue(newValue)
            return
        }
        onRemoveHandler()
    });


    const { getPropState } = useChangeSetProps(value, onChangeMiddleware);


    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            <PropertyNameInput
                {...getPropState("property")}
            />
            <Typography variant="h5" sx={{ padding: "0 0.3em" }}>:</Typography>
            <AddValidationButton
                {...getPropState("value")}
            // value={propertyValue}
            // onChange={setProps("value")}

            />
        </Stack>
    </>;
}); 