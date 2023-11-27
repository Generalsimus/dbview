import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack } from "@mui/material";
import React, { } from "react";
import AddIcon from '@mui/icons-material/Add';
import { InputProps } from "@/basic/generics";
import { PropertyInput } from "./property-input";
// import { AddValidation } from "./add-validation";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";

// const useMemoArgCall = () => {





interface IProps extends InputProps<ValidationPropertyType[]> {

}
export const ValidationsInput: React.FC<IProps> = React.memo(({ value = [], setValue, setProps, getPropState }) => {

    const getMemoArgFunction = useMemoArgCall((index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        setValue(newValue);
    })

    const onAddEmptyPropValidation = useMemoCall(() => {
        setValue([
            ...value,
            {
                property: "",
                value: {}
            }
        ]);
    });

    return <Stack
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        justifyContent={"flex-start"}
        alignItems={"flex- start"}
    >
        {value.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
            {value.map((_, index) => {

                return <PropertyInput  {...getPropState(index)} onRemove={getMemoArgFunction(index)} />
            })}
        </Stack> : null}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onAddEmptyPropValidation} size="large">
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});