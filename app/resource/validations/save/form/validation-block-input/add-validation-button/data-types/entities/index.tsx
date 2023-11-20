import { ValidateValueType } from "@/basic/models/validation/data-types";
import { NumberValidateDataTypesEnums } from "@/basic/models/validation/data-types/number";
import React, { useState } from "react";
import { Min } from "./min";
import { Max } from "./max";
import { InputProps } from "@/basic/generics";

interface IProps extends InputProps<ValidateValueType["entities"][number]> { 
}
export const Entities: React.FC<IProps> = React.memo((props) => {
    switch (props.value?.type) {
        case NumberValidateDataTypesEnums.Max:
            return <Max {...props} />
        case NumberValidateDataTypesEnums.Min:
            return <Min {...props} />
    }
    return <></>;
});
