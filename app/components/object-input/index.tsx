import React from "react";
import { PropertyNameViews, PropertyType } from "./types";
import { IconButton, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { PartialKeys } from "@/utils/generics";
import { PropertyInput } from "./property-input";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps<V = PartialKeys<PropertyType, "value">> {
    value?: V[],
    onChange: (newValue: V[]) => void,
    optionalValue: PropertyNameViews
}
export const ObjectInput: React.FC<IProps> = React.memo(({ value = [], onChange, optionalValue }) => {



    const addEmptyProperty = useMemoCall(() => {
        onChange([
            ...value,
            { propertyName: "", value: undefined }
        ])
    });
    const onRemoveProperty = useMemoArgCall((index: number) => {
        value.splice(index, 1)
        onChange([...value])
    })
    const onChangeProperty = useMemoArgCall((index: number, newPropertyValue: PartialKeys<PropertyType, "value">) => {
        value.splice(index, 1, newPropertyValue)
        onChange([...value])
    });
    // const schema = CreateObjectValidationSchema(optionalValue)
    // console.log({ schema })
    return <>
        <Stack
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            justifyContent={"flex-start"}
            alignItems={"flex- start"}
        >
            {value.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
                {value.map((property, index) => {

                    return <PropertyInput value={property} onChange={onChangeProperty(index)} onRemove={onRemoveProperty(index)} optionalValues={optionalValue} />
                })}
            </Stack> : null}
            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <IconButton onClick={addEmptyProperty} size="large">
                    <AddIcon />
                </IconButton>
            </Stack>
        </Stack>
    </>;
});
