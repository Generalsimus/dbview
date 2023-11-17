import { InputChange } from "@/basic/generics";
import { MinType } from "@/basic/models/validation/data-types/entities";
import { NumberMinLengthEntityType } from "@/basic/models/validation/data-types/number";
import { StringMinLengthEntityType } from "@/basic/models/validation/data-types/string";
import React, { useState } from "react";

interface IProps extends InputChange<StringMinLengthEntityType | NumberMinLengthEntityType> {
}
export const Min: React.FC<IProps> = React.memo(({ value, onChange }) => {

    return <>MIn</>;
});
