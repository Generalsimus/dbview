import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent } from "react";
import { ArgValueType, InputTypes, ValueTypes } from "../../types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { AutoResizeField } from "@/app/components/auto-resize-field";



interface IProps extends ExtractTypeWithProp<ValueTypes, "type", InputTypes.Number> {
    onChange: (newValue: ArgValueType) => void
}
export const Number: React.FC<IProps> = React.memo(({ type, value, onChange }) => {
    const omChangeValue = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log({
        //     type: InputTypes.String,
        //     value: 2
        // })
        onChange({
            type: type,
            value: parseInt(e.target.value)
        })
    })
    console.log("value", { value })
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
