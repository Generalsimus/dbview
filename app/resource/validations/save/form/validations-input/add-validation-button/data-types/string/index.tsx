
import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
// import { AddValidationsList } from "../validation-list";
import { StringEntityValidationType, StringValidateDataTypes, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
// import { useMemoCall } from "@/app/utils/hooks";
import { InputProps } from "@/basic/generics";
import { filter, map } from "lodash";
// import { TypeNameViewContainer } from "./type-name-container";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Entities } from "../entities";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { TypeNameViewContainer } from "../type-name-container";
import { AddValidationsList } from "../../validation-list";
import { NumberDataTypeConstructor } from "sequelize";
// import { ValidPropGen } from "../generics";
// import {   } from "./string-type";
// l 
// type sss = UnionToIntersection<StringDataTypeValidationType & NumberDataTypeValidationType>


interface IProps extends InputProps<StringDataTypeValidationType | NumberDataTypeValidationType> {
    onRemove: () => void
}
export const StringTypeView: React.FC<IProps> = React.memo((props) => {
    // const ttt = props.value?.entities
    // const ttt = props.value?.type
    const { value = {}, setValue, getPropState, onRemove } = props;
    const { entities = [], type } = value;

    const addDataType = useMemoCall((newType: StringEntityValidationType["type"]) => {
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
            const state = getPropState("entities", index)

            return <Entities type={state.value?.type} {...(state as any)} onRemove={getMemoArgRemoveFunction(index)} />
        })}
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;
});
