import { useMemoCall, useToggleBool } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { IconButton, Stack, useTheme } from "@mui/material";
import React, { } from "react";
import AddIcon from '@mui/icons-material/Add';
import { OptionalKeys } from "@/basic/generics";
import { BlockPropertyInput } from "./block-property-input";

interface IProps<V = (OptionalKeys<ValidationBlockType, "schemas">[])> {
    value?: V,
    onChange: (newValue: V) => void
}
export const ValidationBlockInput: React.FC<IProps> = React.memo(({ value: propertyAndSchema = [], onChange }) => {
    const theme = useTheme()

    const [isAddingProcess, initDefaultValue] = useToggleBool(false)
    const onShowAddInput = initDefaultValue(true);
    const onHideAddInput = initDefaultValue(false);


    const onRemoveItem = useMemoCall((property: ValidationBlockType["property"]) => {
        onChange(propertyAndSchema.filter(e => (e.property !== property)));
    });
    const onChangeValidation = useMemoCall((newValue: OptionalKeys<ValidationBlockType, "schemas">, prevPropertyName: string) => {
        if (newValue.property.length !== 0) {
            if (prevPropertyName.length == 0) {
                onChange([
                    ...propertyAndSchema.filter(e => (e.property !== newValue.property)),
                    newValue
                ])
            } else {
                onChange(propertyAndSchema.map(el => {
                    if (el.property == prevPropertyName) {
                        return newValue
                    }
                    return el;
                }))
            }
        }
        onHideAddInput()
    })



    return <Stack
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        justifyContent={"flex-start"}
        alignItems={"flex- start"}
        border={`1px solid ${theme.palette.action.active}}`}
        borderRadius={theme.shape.borderRadius}
        padding={"5px"}
    >
        {propertyAndSchema.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
            {propertyAndSchema.map(item => {
                return <BlockPropertyInput
                    key={item.property}
                    onChange={onChangeValidation}
                    onRemove={onRemoveItem}
                    initialProperty={item.property}
                    initialSchemas={item.schemas}
                />
            })}
        </Stack> : null}
        {isAddingProcess && <BlockPropertyInput
            onChange={onChangeValidation}
            onRemove={onHideAddInput}
            initialProperty={""}
        // initialSchema={item.schema}
        />}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onShowAddInput}>
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});
