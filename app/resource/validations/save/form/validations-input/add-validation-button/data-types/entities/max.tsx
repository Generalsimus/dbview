import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { TypeNameViewContainer } from "../type-name-container";
import { NumberEntityValidationSchema, NumberEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import React, { ChangeEvent } from "react";


interface IProps extends InputProps<ExtractTypeWithProp<NumberEntityValidationType, "type", EntityValidateEnums.Max>> {
    onRemove: () => void
}
export const Max: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entityValue = 0 } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {

        setValue({
            ...value,
            entityValue: parseInt(e.target.value)
        })
    })
    const { getError } = getValidation(NumberEntityValidationSchema, false)




    return <>
        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
            <AutoResizeField
                type="number"
                value={entityValue}
                variant="outlined"
                size="small"
                onChange={onChangeMAxValue}
                autoFocus
                sx={{ minHeight: "1.5em", minWidth: "1em" }}
                hiddenLabel
                {...getError()}

            />
        </TypeNameViewContainer>
    </>;
});

