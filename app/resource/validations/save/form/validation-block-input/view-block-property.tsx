import { ValidateValueType, ValidationBlockType } from "@/basic/models/validation/validation";
import React, { useState } from "react";
import { BlockPropertyInput } from "./block-property-input";
// import { ViewBlockProperty } from "./view-block-property";
import { useMemoCall } from "@/app/utils/hooks";

interface IProps {
    value: ValidationBlockType
    onChange: (oldProperty: string, newValue: ValidationBlockType) => void
}
export const ViewBlockProperty: React.FC<IProps> = React.memo(({ value: [propertyName, schema], onChange }) => {
    const [isEditing, setIsEditing] = useState(false)
    const onEdit = useMemoCall((originalProperty: string, property: string, schema: ValidateValueType) => {
        onChange(originalProperty, [property, schema])
    })

    return <>
        {isEditing ? <BlockPropertyInput
            onEdit={onEdit}
            onAdd={undefined}
            propertyName={propertyName}
            initialSchema={schema}
        /> : <div>{propertyName}</div>}

    </>;
}); 