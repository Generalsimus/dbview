import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent, useMemo, useState } from "react";
import { InputTypes, ValueTypes } from "../../types";
// import { AutoResizeField } from "../../auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { AutoResizeField } from "@/app/components/auto-resize-field";

interface IProps<V = ExtractTypeWithProp<ValueTypes, "type", InputTypes.String>> {
    value: V
    onChange: (newValue: V) => void
}
export const String: React.FC<IProps> = React.memo(({ value, onChange }) => {
    const omChangeValue = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({
            ...value,
            value: e.target.value + ""
        })
    })
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
