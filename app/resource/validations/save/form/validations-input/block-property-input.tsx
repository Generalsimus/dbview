import { ValidationPropertySchema, ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputProps, MakeStateValue, OptionalKeys } from "@/basic/generics";
import { AddValidationButton } from "./add-validation-button";
import { ValidateValueType } from "@/basic/models/validation/data-types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";
import { EditPropertyNameInput } from "./property-name-input";
import { ErrorText } from "@/app/components/error-text";

interface IProps extends InputProps<ValidationPropertyType> {
    onRemove: (name: ValidationPropertyType["property"]) => void,
}
export const BlockPropertyInput: React.FC<IProps> = React.memo(({ onRemove, getPropState, setProps, getValidation, value = {} }) => {

    const onRemoveHandler = useMemoCall(() => {
        onRemove(value.property + "");
    });
    const onRemoveSafeHandler = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            for (const _ in (value.value || {})) {
                return;
            }
            onRemoveHandler()
        }
    });
    const onRemoveValueValidation = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            onRemoveHandler()
        } else {
            setProps("value")({});
        }
    })
    const { getError } = getValidation(ValidationPropertySchema, false)

    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            <EditPropertyNameInput {...getPropState("property")} onBlur={onRemoveSafeHandler} />

            <Typography variant="h5" sx={{ padding: "0 0.3em" }}>:</Typography>

            <AddValidationButton {...getPropState("value")} onRemove={onRemoveValueValidation} />
            <ErrorText error={getError("value").helperText} />
        </Stack>
    </>;
}); 