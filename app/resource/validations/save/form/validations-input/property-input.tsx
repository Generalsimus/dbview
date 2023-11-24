import { ValidationPropertySchema, ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeepPartial, DeepUnion, InputProps, InputPropsRequiredValue, MakeStateValue } from "@/basic/generics";
import { AddValidationButton } from "./add-validation-button";
import { ValidateValueType } from "@/basic/models/validation/data-types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";
import { EditPropertyNameInput } from "./property-name-input";
import { ErrorText } from "@/app/components/error-text";
import { SetPropsRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";

interface IProps extends InputPropsRequiredValue<ValidationPropertyType> {
    onRemove: () => void
}
export const PropertyInput: React.FC<IProps> = React.memo(({ onRemove, getPropState, setProps, getValidation, value = {} }) => {
    const val = value;
    // DeepPartialObject<{
    //     property: string;
    //     value: {
    //         type: ValidateDataTypesEnums;
    //         entities: {
    //             type: EntityValidationEnums;
    //             entity: {
    //                 value?: string | number | undefined;
    //             };
    //         }[];
    //     };
    // }>
    // const onRemoveHandler = useMemoCall(() => {
    //     ();
    // });
    const onRemoveSafeHandler = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            for (const _ in (value.value || {})) {
                return;
            }
            onRemove()
        }
    });
    const onRemoveValueValidation = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            onRemove()
        } else {
            setProps("value")({});
        }
    })
    const { getError } = getValidation(ValidationPropertySchema, false)

    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemove}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            <EditPropertyNameInput {...getPropState("property")} onBlur={onRemoveSafeHandler} />

            <Typography variant="h5" sx={{ padding: "0 0.3em" }}>:</Typography>

            <AddValidationButton {...getPropState("value")} onRemove={onRemoveValueValidation} />
            <ErrorText error={getError("value").helperText} />
        </Stack>
    </>;
}); 