
import { StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
// import { useMemoCall } from "@/app/utils/hooks";
import { InputProps } from "@/basic/generics";
import { map } from "lodash";
import { TypeNameViewContainer } from "./type-name-container";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
// import {   } from "./string-type";

interface IProps extends InputProps<StringDataTypeValidationType> {
    // value: 
    // onChange: (newValue: StringDataTypeValidationType) => void
}
export const StringTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue } = props;
    const { entities = [], type } = value;

    const addDataType = useMemoCall((type: StringValidateDataTypesEnums) => {
        setValue({
            type: type,
            entities: [
                ...entities,
                {
                    type: type,
                }
            ]
        })
    });
    const entitiesTypes = useMemo(() => {
        const exitedEntities = map(entities, "type");

        return StringValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])

    return <>
        <TypeNameViewContainer type={type} />
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;
});
