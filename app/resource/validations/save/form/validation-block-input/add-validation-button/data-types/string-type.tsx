
import { StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
import { useMemoCall } from "@/app/utils/hooks";
import { InputChange } from "@/basic/generics";
import { map } from "lodash";
// import {   } from "./string-type";

interface IProps extends InputChange<StringDataTypeValidationType> {
    // value: 
    // onChange: (newValue: StringDataTypeValidationType) => void
}
export const StringTypeView: React.FC<IProps> = React.memo(({ value = {}, onChange }) => {
    const { entities = [], type } = value;

    const addDataType = useMemoCall((type: StringValidateDataTypesEnums) => {
        onChange({
            type: type,
            entities: [
                ...(entities || []),
                {
                    type: type,
                }
            ]
        })
    });
    const entitiesTypes = useMemo(() => {
        const exitedEntities = map(entities, "type")
        // entities.map(e => e?.type);
        return StringValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])

    return <>
        <Typography>
            .{type}()
        </Typography>
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;
});
