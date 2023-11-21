import { InputProps } from "@/basic/generics";
import { MinType } from "@/basic/models/validation/data-types/entities";
import { NumberMinLengthEntityType } from "@/basic/models/validation/data-types/number";
import { StringMinLengthEntityType } from "@/basic/models/validation/data-types/string";
import React, { useState } from "react";
import { TypeNameViewContainer } from "../type-name-container";

interface IProps extends InputProps<StringMinLengthEntityType | NumberMinLengthEntityType> {
}
export const Min: React.FC<IProps> = React.memo(({ value = {}, setValue }) => {

    return <>
        <TypeNameViewContainer type={value.type} />
    </>;
});
