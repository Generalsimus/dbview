
import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
// import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypes, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
import { NumberEntityValidationType, NumberValidateDataTypes, NumberValidateEntitiesTypes } from "@/basic/models/validation/data-types/number";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { Entities } from "./entities";
import { InputProps } from "@/basic/generics";
import { filter, map } from "lodash";
// import { TypeNameViewContainer } from "./type-name-container";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { SwitchTypePropGen } from "../../generics";
import { TypeNameViewContainer } from "../type-name-container";
import { AddValidationsList } from "../../validation-list";
// import { SwitchTypePropGen } from "../generics";
// import { MinLength } from "./entities/min-length";


// interface IProps<Value = NumberDataTypeValidationType> extends InputProps<Value> {
//     onRemove: () => void
// }
// interface IProps<Value = NumberDataTypeValidationType> extends InputProps<Value> {
//     onRemove: () => void
// }


// type IProps = SwitchTypePropGen<ValidateValueType>
interface IProps extends InputProps<ValidateValueType> {
    onRemove: () => void
}
export const NumberTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, setProps, getPropState, onRemove } = props;
    const { entities = [], type } = value;

    const addDataType = useMemoCall((newType: (typeof entities)[number]["type"]) => {
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

        return NumberValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])

    const onRemoveEntity = useMemoCall((removeItem: (typeof entities)[number]) => {
        setValue({
            ...value,
            entities: entities.filter(e => {
                return e?.type !== removeItem?.type
            })
        });
    })
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

            return <Entities type={(state.value?.type)} {...(state as any)} onRemove={getMemoArgRemoveFunction(index)} />
        })}
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;

});
