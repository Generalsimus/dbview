import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import React, { useMemo, useState } from "react";
// import { StringTypeView } from "./string-type";
// import { NumberTypeView } from "./number-type";
import { InputProps } from "@/basic/generics";
import { NumberEntityValidationType, NumberValidateEntitiesTypes } from "@/basic/models/validation/data-types/number";
import { StringEntityValidationType, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
// import { SwitchTypePropGen } from "../generics";
// import { StringTypeView } from "./string";
// import { NumberTypeView } from "./number";
import { TypeNameViewContainer } from "./type-name-container";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";
import { AddValidationsList } from "../validation-list";
import { Entities } from "./entities";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { map } from "lodash";



interface IProps extends InputProps<ValidateValueType> {
    onRemove: () => void
}
export const DataTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, getPropState, onRemove } = props;
    const { entities = [], type } = value;

    //     // switch (props.value?.type) {
    //     // case ValidateDataTypesEnums.String:
    //     // return <StringTypeView {...props} />
    //     // case ValidateDataTypesEnums.Number:
    //     return <NumberTypeView  {...props} />
    //     // }

    const getMemoArgRemoveFunction = useMemoArgCall((index: number) => {
        setValue({
            ...value,
            entities: entities.splice(index, 1),
        });
    });
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

        return getDataTypeEntitiesFor(value.type).filter(e => !exitedEntities.includes(e));
    }, [entities])

    return <>
        <TypeNameViewContainer type={type} onRemove={onRemove} />
        {entities.map((item, index) => {
            const state = getPropState("entities", index)

            return <Entities type={state.value?.type} {...(state as any)} onRemove={getMemoArgRemoveFunction(index)} />
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