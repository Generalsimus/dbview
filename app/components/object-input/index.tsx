import React, { useEffect, useState } from "react";
import { PropertyNameViews, PropertyNameViewsValue, PropertyType } from "./types";
import { IconButton, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { PartialKeys } from "@/basic/generics";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { PropertyInput } from "./property-input";
import { filter } from "lodash";

interface IProps<V = PropertyType> {
    value?: V[],
    onChange: (newValue: V[]) => void,
    optionalValue: PropertyNameViews
}
export const ObjectInput: React.FC<IProps> = React.memo(({ value: initialValue = [], onChange: onChangeInitialValue, optionalValue }) => {
    const [values, setValues] = useState<PartialKeys<PropertyType, "value">[]>(initialValue);
    useEffect(() => {
        if (initialValue.length) {
            setValues(initialValue)
        }
    }, [initialValue])


    const addEmptyProperty = useMemoCall(() => {
        setValues([
            { propertyName: "", value: null as any }
        ])
    });
    const onRemoveProperty = useMemoArgCall((index: number) => {
        values.splice(index, 1)
        setValues([...values])
    })
    const onChangeProperty = useMemoArgCall((index: number, newPropertyValue: PartialKeys<PropertyType, "value">) => {
        values.splice(index, 1, newPropertyValue)
        setValues([...values])
    });

    return <>
        <Stack
            display={"flex"}
            flexDirection={"column"}
            gap={1}
            justifyContent={"flex-start"}
            alignItems={"flex- start"}
        >
            {values.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
                {values.map((property, index) => {

                    return <PropertyInput value={property} onChange={onChangeProperty(index)} onRemove={onRemoveProperty(index)} optionalValues={optionalValue} />
                })}
            </Stack> : null}

            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <IconButton onClick={addEmptyProperty} size="large">
                    <AddIcon />
                </IconButton>
            </Stack>
        </Stack>;
    </>;
});
