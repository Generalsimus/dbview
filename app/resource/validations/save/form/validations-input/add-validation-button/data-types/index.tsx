import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import React, { useState } from "react";
import { StringTypeView } from "./string-type";
import { NumberTypeView } from "./number-type";
import { InputProps } from "@/basic/generics";

interface IProps<Value = ValidateValueType> extends InputProps<Value> {
    onRemove: () => void
}
export const DataTypeView: React.FC<IProps> = React.memo((props) => {
    // const { value,   } = props;
    // console.log(props.value)

    switch (props.value?.type) {
        case ValidateDataTypesEnums.String:
            return <StringTypeView  {...props} />
        case ValidateDataTypesEnums.Number:
            return <NumberTypeView  {...props} />
    }

    return <></>;
});
