import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent, useMemo, useState } from "react";
import { ArgValueType, InputTypes, ValueTypes } from "../../types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { AutoResizeField } from "@/app/components/auto-resize-field";



interface IProps extends ExtractTypeWithProp<ValueTypes, "type", InputTypes.String> {
    onChange: (newValue: ArgValueType) => void
}
export const String: React.FC<IProps> = React.memo(({ type, value, onChange }) => {
    const omChangeValue = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({
            type: type,
            value: e.target.value + ""
        })
    })
    return <>
        <AutoResizeField
            type="number"
            value={value}
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
