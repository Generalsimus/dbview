import React, { useMemo, useState } from "react"; 
import { InputProps } from "@/basic/generics";
import { TypeNameViewContainer } from "./type-name-container";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { AddValidationsList } from "../validation-list";
import { Entities } from "./entities";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { map } from "lodash";
import { ValidateDataTypesEnums } from "@/basic/models/validation/data-types/enums";
import { NumberValidateEntitiesTypes, StringValidateEntitiesTypes, ValidateValueType } from "@/basic/models/validation/data-types/schema";



interface IProps extends InputProps<ValidateValueType> {
    onRemove: () => void
}
export const DataTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, getPropState, onRemove } = props;
    const { entities = [], type } = value;


    const getMemoArgRemoveFunction = useMemoArgCall((index: number) => {
        const newEntities = [...entities];
        newEntities.splice(index, 1);

        setValue({
            ...value,
            entities: newEntities,
        });
    });
    const addDataType = useMemoCall((newType: (typeof entities)[number]["type"]) => {
        setValue({
            ...value,
            entities: [
                ...entities,
                {
                    type: newType,
                    entityValue: undefined
                }
            ]
        })
    });


    const entitiesTypes = useMemo(() => {
        const exitedEntities = map(entities, "type");

        return getDataTypeEntitiesFor(value.type).filter(e => !exitedEntities.includes(e));
    }, [entities])

    return <>
        <TypeNameViewContainer type={type} onRemove={onRemove} />
        {entities.map((item, index) => {
            const state = getPropState("entities", index)

            return <Entities type={state.value?.type} {...state as any} onRemove={getMemoArgRemoveFunction(index)} />
        })}
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;

    return <></>;
});
const getDataTypeEntitiesFor = (type?: ValidateDataTypesEnums) => {
    switch (type) {
        case ValidateDataTypesEnums.Number:
            return NumberValidateEntitiesTypes
        case ValidateDataTypesEnums.String:
            return StringValidateEntitiesTypes
    }
    return []
}