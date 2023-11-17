import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import React, { useState } from "react";
import { StringTypeView } from "./string-type";
import { NumberTypeView } from "./number-type";
import { InputChange } from "@/basic/generics";

interface IProps extends InputChange<ValidateValueType> {
    // value: ValidateValueType
    // value: 
    // onChange: (newValue: ValidateValueType) => void
}
export const DataTypeView: React.FC<IProps> = React.memo(({ value, onChange }) => {

    switch (value?.type) {
        case ValidateDataTypesEnums.String:
            return <StringTypeView value={value} onChange={onChange} />
        case ValidateDataTypesEnums.Number:
            return <NumberTypeView value={value} onChange={onChange} />
    }

    return <></>;
});
