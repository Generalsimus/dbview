import { ValidateValueType } from "@/basic/models/validation/data-types";
import { NumberValidateDataTypesEnums } from "@/basic/models/validation/data-types/number";
import React, { useState } from "react";
import { Min } from "./min";
import { Max } from "./max";
import { InputProps } from "@/basic/generics";
import { StringValidateDataTypesEnums } from "@/basic/models/validation/data-types/string";
import { MaxLengthSchema } from "@/basic/models/validation/data-types/entities";
import { MinLength } from "./min-length";
import { MaxLength } from "./max-length";
import { Optional } from "./optional";

interface IProps<Value = ValidateValueType["entities"][number]> extends InputProps<Value> {
    //     onRemove: (item: Value) => void 
    onRemove: () => void
}
export const Entities: React.FC<IProps> = React.memo((props) => {
    // console.log(props.value)
    switch (props.value?.type) {
        case StringValidateDataTypesEnums.MaxLength:
            return <MaxLength {...props} />
        case StringValidateDataTypesEnums.MinLength:
            return <MinLength {...props} />
        case NumberValidateDataTypesEnums.Max:
            return <Max {...props} />
        case NumberValidateDataTypesEnums.Min:
            return <Min {...props} />
        case NumberValidateDataTypesEnums.Optional:
            return <Optional {...props} />

    }
    return <></>;
});
