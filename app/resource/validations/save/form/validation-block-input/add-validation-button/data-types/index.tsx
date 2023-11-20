import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import React, { useState } from "react";
import { StringTypeView } from "./string-type";
import { NumberTypeView } from "./number-type";
import { InputProps } from "@/basic/generics";

interface IProps extends InputProps<ValidateValueType> {
    // value: ValidateValueType
    // value: 
    // onChange: (newValue: ValidateValueType) => void
}
export const DataTypeView: React.FC<IProps> = React.memo((props) => {
    // const { value,   } = props;

    switch (props.value?.type) {
        case ValidateDataTypesEnums.String:
            return <StringTypeView  {...props} />
        case ValidateDataTypesEnums.Number:
            return <NumberTypeView  {...props} />
    }

    return <></>;
});
