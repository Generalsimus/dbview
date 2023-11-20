
import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
import { NumberValidateDataTypesEnums, numberValidateEntitiesTypes } from "@/basic/models/validation/data-types/number";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { Entities } from "./entities";
import { InputProps } from "@/basic/generics";
import { map } from "lodash";
import { TypeNameViewContainer } from "./type-name-container";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";


interface IProps extends InputProps<NumberDataTypeValidationType> {
}
export const NumberTypeView: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, setProps, getPropState } = props;
    const { entities = [], type } = value;
    // const { setProps } = useChangeSetProps(value, onChange)

    const addDataType = useMemoCall((newType: NumberValidateDataTypesEnums) => {
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

        return numberValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])


    // console.log({ entities })
    return <>
        <TypeNameViewContainer type={type} />
        {entities.map((item, index) => {
            return <Entities  {...getPropState("entities", index)} />
        })}
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;

});
