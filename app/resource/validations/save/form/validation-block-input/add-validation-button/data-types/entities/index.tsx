import { ValidateValueType } from "@/basic/models/validation/data-types";
import { NumberValidateDataTypesEnums } from "@/basic/models/validation/data-types/number";
import React, { useState } from "react";
import { Min } from "./min";
import { Max } from "./max";
import { InputChange } from "@/basic/generics";

interface IProps extends InputChange<ValidateValueType["entities"][number]> {
    // value: V,.
}
export const Entities: React.FC<IProps> = React.memo(({ value, onChange }) => {
    switch (value?.type) {
        case NumberValidateDataTypesEnums.Max:
            return <Max value={value} onChange={onChange} />
        case NumberValidateDataTypesEnums.Min:
            return <Min value={value} onChange={onChange} />
    }
    return <></>;
});
