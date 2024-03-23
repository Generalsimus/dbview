import { AutoResizeField } from "@/app/components/auto-resize-field";
import React, { ChangeEvent, KeyboardEvent } from "react";
import { PropertyType } from "./types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";


interface IProps<V = PropertyType["propertyName"]> {
    value?: V,
    onChange: (newValue: V) => void,
    onBlur?: () => void
}
export const PropertyNameInput: React.FC<IProps> = React.memo(({ value = "", onChange, onBlur }) => {


    const onOnKeyDown = useMemoCall((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onBlur?.()
        }
    });
    const onChangeHandler = useMemoCall((event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    });

    return <>
        <AutoResizeField
            sx={{
                minWidth: "1em",
                minHeight: "1.5em",
            }}
            value={value}
            variant="outlined"
            size="small"
            onChange={onChangeHandler}
            onBlur={onBlur}
            autoFocus
            onKeyDown={onOnKeyDown}
            hiddenLabel />
    </>;
});
