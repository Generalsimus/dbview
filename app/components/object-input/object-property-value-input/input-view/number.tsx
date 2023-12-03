import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent, useMemo, useState } from "react";
import { InputTypes, ValueTypes } from "../../types";
// import { AutoResizeField } from "../../auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { AutoResizeField } from "@/app/components/auto-resize-field";

interface IProps<V = ExtractTypeWithProp<ValueTypes, "type", InputTypes.Number>> {
    value: V
    onChange: (newValue: V) => void
}
export const Number: React.FC<IProps> = React.memo(({ value, onChange }) => {
    const omChangeValue = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log({
            ...value,
            value: parseInt(e.target.value)
        })
        onChange({
            ...value,
            value: parseInt(e.target.value)
        })
    })
    console.log({ value })
    return <>
        <AutoResizeField
            type="number"
            value={value.value}
            variant="outlined"
            size="small"
            onChange={omChangeValue}
            autoFocus
            sx={{ minHeight: "1.5em", minWidth: "1em" }}
            hiddenLabel
        // {...getError()}

        />
    </>;
});
