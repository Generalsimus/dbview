
import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "@/basic/models/validation/data-types";
import { Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { AddValidationsList } from "../validation-list";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "@/basic/models/validation/data-types/string";
import { NumberValidateDataTypesEnums, numberValidateEntitiesTypes } from "@/basic/models/validation/data-types/number";
import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { Entities } from "./entities";
import { InputChange } from "@/basic/generics";
import { map } from "lodash";


interface IProps extends InputChange<NumberDataTypeValidationType> {
}
export const NumberTypeView: React.FC<IProps> = React.memo(({ value = {}, onChange }) => {
    const { state, setState, setProps } = useChangeSetProps(value, onChange)
    const { entities, type } = state;

    const addDataType = useMemoCall((newType: NumberValidateDataTypesEnums) => {
        setState({
            ...state,
            type: newType,
        })
    });
    const entitiesTypes = useMemo(() => {
        const exitedEntities = map(entities, "type")
        // entities?.map(e => e?.type) || [];
        return numberValidateEntitiesTypes.filter(e => !exitedEntities.includes(e))
    }, [entities])


    return <>
        <Typography>.{type}()</Typography>
        <AddValidationsList entityTypes={entitiesTypes} onChange={addDataType} />
    </>;

});
