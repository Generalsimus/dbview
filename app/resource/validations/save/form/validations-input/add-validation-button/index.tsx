import React, { MouseEvent, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack, Typography } from "@mui/material";
// import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { ValidateDataTypesEnums, ValidateValueType, ValidateDataTypes, StringDataTypeValidationType, NumberDataTypeValidationType } from '@/basic/models/validation/data-types';
// import { getDataTypeEntities } from '@/basic/models/validation/utils';
import { AddValidationsList } from './validation-list';
import { DataTypeView } from './data-types';
import { InputProps } from '@/basic/generics';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';
import { Partial, filter } from 'lodash';
import { SwitchTypePropGen } from './generics';


// type IPropGen<T> = T extends any ? InputProps<T> & {
//     onRemove: () => void
// } : never;

// type IProps = SwitchTypePropGen<ValidateValueType>;

// type IProps = SwitchTypePropGen<ValidateValueType>

interface IProps extends InputProps<ValidateValueType> {
    onRemove: () => void
}
export const AddValidationButton: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue, onRemove } = props;

    const addDataType = useMemoCall((type: ValidateDataTypesEnums) => {
        // if (value.type == type) {
        setValue({
            type: type,
            entities: []
        })

        // }
    });
    // const eeee: any = props.value?.type
    // if (value.type) {
    //     return <DataTypeView   {...(props)} onRemove={onRemove} />
    // }

    return <>
        {

            value.type ? <DataTypeView {...props} onRemove={onRemove} /> :
                <AddValidationsList entityTypes={ValidateDataTypes} onChange={addDataType} />
        }
    </>
})