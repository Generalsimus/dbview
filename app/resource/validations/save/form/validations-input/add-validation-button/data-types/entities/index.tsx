import { ValidateValueType } from "@/basic/models/validation/data-types";
import { NumberEntityValidationType } from "@/basic/models/validation/data-types/number";
import React, { Dispatch, SetStateAction, useState } from "react";
// import { Min } from "./min";
// import { Max } from "./max";
import { InputProps, MakeStateValue } from "@/basic/generics";
import { StringEntityValidationType, StringMaxLengthEntityType } from "@/basic/models/validation/data-types/string";
import { EntityValidationEnums, MaxLengthSchema } from "@/basic/models/validation/data-types/entities";
import { MinLength } from "./min-length";
import { MaxLength } from "./max-length";
import { Optional } from "./optional";
import { Regex } from "./regex";
// import { SwitchTypePropGen } from "../../generics";
import { SetPropsRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
// import { SwitchTypePropGen } from "../../generics";
import { Max } from "./max";
import { Min } from "./min";

// type OptionalKeys = "setValu"
export type SwitchTypePropGen<T extends { type: any }> = (T extends any ? InputProps<T> & {
    type?: T["type"] | undefined
    onRemove: () => void
} : never);

type IProps = SwitchTypePropGen<StringEntityValidationType | NumberEntityValidationType>

export const Entities: React.FC<IProps> = (props: IProps) => {

    // }
    switch (props?.type) {
        case EntityValidationEnums.MaxLength:
            return <MaxLength {...props} />
        case EntityValidationEnums.Max:
            return <Max {...props} />
        case EntityValidationEnums.Min:
            return <Min {...props} />
        case EntityValidationEnums.MinLength:
            return <MinLength {...props} />
        case EntityValidationEnums.Optional:
            return <Optional {...props} />
        case EntityValidationEnums.Regex:
            return <Regex {...props} />

    }
    return <></>;
}