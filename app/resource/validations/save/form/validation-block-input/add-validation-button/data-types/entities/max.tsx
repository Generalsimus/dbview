import { InputChange } from "@/basic/generics";
import { MaxType } from "@/basic/models/validation/data-types/entities";
import { NumberMaxLengthEntityType } from "@/basic/models/validation/data-types/number";
import { StringMaxLengthEntityType, StringMinLengthEntityType } from "@/basic/models/validation/data-types/string";
import React, { useState } from "react";

interface IProps extends InputChange<StringMaxLengthEntityType | NumberMaxLengthEntityType> {
    // value: 
    // onChange: (newValue: StringMaxLengthEntityType | NumberMaxLengthEntityType) => void
}
export const Max: React.FC<IProps> = React.memo(({ value, onChange }) => {

    return <>Max</>;
});

