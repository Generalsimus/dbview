import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent } from "react";
import { ArgValueType, InputTypes, ValueTypes } from "../../types";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";



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
