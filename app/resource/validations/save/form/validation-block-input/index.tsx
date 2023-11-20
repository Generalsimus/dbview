// import { useChangeSetProps, useMemoCall, useToggleBool } from /"@/app/utils/hooks";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack, useTheme } from "@mui/material";
import React, { } from "react";
import AddIcon from '@mui/icons-material/Add';
import { InputProps, MakeStateValue, OptionalKeys } from "@/basic/generics";
import { BlockPropertyInput } from "./block-property-input";
import { filter, find, negate, remove } from "lodash"
import { ValidateValueType } from "@/basic/models/validation/data-types";
import { AddValidation } from "./add-validation";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps extends InputProps<ValidationPropertyType[] | undefined> {


    // {/* <V = (OptionalKeys<ValidationPropertyType, "value">[])> */ }
    // value?: V,
    // onChange: (newValue: V) => void
}
export const ValidationBlockInput: React.FC<IProps> = React.memo(({ value = [], setValue, setProps, getPropState }) => {
    const theme = useTheme()

    // const { setProps } = useChangeSetProps(value, onChange)
    // 

    const onRemoveItem = useMemoCall((property: ValidationPropertyType["property"]) => {

        setValue(
            value.filter(e => e?.property !== property)
        );
    });


    const onAddEmptyPropValidation = useMemoCall(() => {
        setValue([
            ...value,
            {
                property: "",
                value: {}
            }
        ]);
    })


    return <Stack
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        justifyContent={"flex-start"}
        alignItems={"flex- start"}
    // border={`1px solid ${theme.palette.action.active}}`}
    // borderRadius={theme.shape.borderRadius}
    // padding={"5px"}
    >
        {value.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
            {value.map((item, index) => {
                return <BlockPropertyInput
                    {...getPropState(index)}
                    onRemove={onRemoveItem}
                />
            })}
        </Stack> : null}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onAddEmptyPropValidation} size="large">
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});
