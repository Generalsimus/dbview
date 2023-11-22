import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack, useTheme } from "@mui/material";
import React, { useMemo, useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import { InputProps, MakeStateValue, OptionalKeys } from "@/basic/generics";
import { BlockPropertyInput } from "./block-property-input";
import { filter, find, isEqual, negate, remove } from "lodash"
import { ValidateValueType } from "@/basic/models/validation/data-types";
// import { AddValidation } from "./add-validation";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";

// const useMemoArgCall = () => {





interface IProps extends InputProps<ValidationPropertyType[]> {

}
export const ValidationsInput: React.FC<IProps> = React.memo(({ value = [], setValue, setProps, getPropState }) => {


    const getMemoArgFunction = useMemoArgCall((index: number) => {
        setValue(value.splice(index, 1));
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

                return <BlockPropertyInput  {...getPropState(index)} onRemove={getMemoArgFunction(index)} />
            })}
        </Stack> : null}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onAddEmptyPropValidation} size="large">
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});
// continue