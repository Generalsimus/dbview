import { NumberEntityValidationType, NumberValidateDataTypes } from "@/basic/models/validation/data-types/number";
import React, { } from "react";
import { Min } from "../../entities/min";
import { Max } from "../../entities/max";
import { StringValidateDataTypes } from "@/basic/models/validation/data-types/string";
import { Optional } from "./optional";
import { SwitchTypePropGen } from "../../../generics";
import { InputProps } from "@/basic/generics";
import { EntityValidationEnums } from "@/basic/models/validation/data-types/entities";
// import { SwitchTypePropGen } from "../../generics";


type IProps = SwitchTypePropGen<NumberEntityValidationType>

// interface IProps<Value = NumberEntityValidationType> extends InputProps<Value> {
//     onRemove: () => void
// }
export const Entities: React.FC<IProps> = (props: IProps) => {

    // }
    // if (!props.value) return
    switch (props.type) {
        case EntityValidationEnums.Max:
            return <Max {...props} />
        case EntityValidationEnums.Min:
            return <Min {...props} />
        case EntityValidationEnums.Optional:
            return <Optional {...props} />
    }
    return <></>;
}
