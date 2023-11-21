import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { InputProps } from "@/basic/generics";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";


interface IProps extends InputProps<ValidationPropertyType["property"]> {
    onBlur?: () => void
}
export const EditPropertyNameInput: React.FC<IProps> = React.memo(({ value = "", setValue, onBlur }) => {


    const onOnKeyDown = useMemoCall((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onBlur?.()
        }
    });
    const onChange = useMemoCall((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
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
            onChange={onChange}
            onBlur={onBlur}
            autoFocus
            onKeyDown={onOnKeyDown}
            hiddenLabel />
    </>;
});
