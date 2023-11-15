import { ValidateValueType, ValidationBlockType } from "@/basic/models/validation/validation";
import React, { useState } from "react";
import { BlockPropertyInput } from "./block-property-input";
// import { ViewBlockProperty } from "./view-block-property";
import { useMemoCall } from "@/app/utils/hooks";
import { OptionalKeys } from "@/basic/generics";

interface IProps {
    value: OptionalKeys<ValidationBlockType, "schema">
    onChange: (newValue: OptionalKeys<ValidationBlockType, "schema">, prevPropertyName: string) => void
    // (oldProperty: string, newValue: ValidationBlockType) => void
}
export const ViewBlockProperty: React.FC<IProps> = React.memo(({ value: { name, schema }, onChange }) => {
    // const [isEditing, setIsEditing] = useState(false)

    return <>
        {/* <BlockPropertyInput
            onChange={onChange}
            propertyName={name}
            initialSchema={schema}
        /> */}
        {/* {isEditing ? <BlockPropertyInput
            onChange={onChange}
            propertyName={name}
            initialSchema={schema}
        /> : <div>{name}</div>} */}

    </>;
}); 