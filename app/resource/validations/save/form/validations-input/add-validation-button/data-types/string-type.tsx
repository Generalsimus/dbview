
import { StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
// import { useMemoCall } from "@/app/utils/hooks";
import { InputProps } from "@/basic/generics";
import { filter, map } from "lodash";
import { TypeNameViewContainer } from "./type-name-container";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Entities } from "./entities";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
// import {   } from "./string-type";

interface IProps<Value = StringDataTypeValidationType> extends InputProps<Value> {
    onRemove: () => void
}
export const StringTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, getPropState, onRemove } = props;
    const { entities = [], type } = value;

    const addDataType = useMemoCall((newType: StringValidateDataTypesEnums) => {
        setValue({
            ...value,
            entities: [
                ...entities,
                {
                    type: newType,
                    entity: {}
                }
            ]
        })
    });


    const entitiesTypes = useMemo(() => {
        const exitedEntities = map(entities, "type");

        return StringValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])


    const getMemoArgRemoveFunction = useMemoArgCall((index: number) => {
        setValue({
            ...value,
            entities: entities.splice(index, 1),
        });
    })


    return <>
        <TypeNameViewContainer type={type} onRemove={onRemove} />
        {entities.map((item, index) => {
            return <Entities  {...getPropState("entities", index)} onRemove={getMemoArgRemoveFunction(index)} />
        })}
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;
});
