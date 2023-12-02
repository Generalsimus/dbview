import React, { Dispatch, SetStateAction, useState } from "react";
import { InputProps, MakeStateValue } from "@/basic/generics";
import { MinLength } from "./min-length";
import { MaxLength } from "./max-length";
import { Optional } from "./optional";
import { Regex } from "./regex";
import { Max } from "./max";
import { Min } from "./min";
// import { NumberEntityValidationType, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import { NumberEntityValidationType, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { Or } from "./or";

export type SwitchTypePropGen<T extends { type: any }> = (T extends any ? InputProps<T> & {
    type?: T["type"] | undefined
    onRemove: () => void
} : never);

type IProps = SwitchTypePropGen<StringEntityValidationType | NumberEntityValidationType>

export const Entities: React.FC<IProps> = (props: IProps) => {

    switch (props?.type) {
        case EntityValidateEnums.MaxLength:
            return <MaxLength {...props} />
        case EntityValidateEnums.Max:
            return <Max {...props} />
        case EntityValidateEnums.Min:
            return <Min {...props} />
        case EntityValidateEnums.MinLength:
            return <MinLength {...props} />
        case EntityValidateEnums.Optional:
            return <Optional {...props} />
        case EntityValidateEnums.Regex:
            return <Regex {...props} />
        case EntityValidateEnums.Or:
            return <Or {...props} />
            // return <div>s</div>
        // return <Regex {...props} />

    }
    return <></>;
}