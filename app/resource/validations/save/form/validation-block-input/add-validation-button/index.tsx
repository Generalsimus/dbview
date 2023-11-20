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
// import { useMemoCall, useToggleBool } from '@/app/utils/hooks';
// import { ValidateAllEnums, getValidateHierarchy } from '@/basic/models/validation/utils';
// import { AddValidationList, ValidationsList } from './add-validation-list';
import { ValidateDataTypesEnums, ValidateValueType, validateDataTypes } from '@/basic/models/validation/data-types';
import { getDataTypeEntities } from '@/basic/models/validation/utils';
import { AddValidationsList } from './validation-list';
import { DataTypeView } from './data-types';
import { InputProps } from '@/basic/generics';
import { useMemoCall } from '@/app/utils/hooks/useMemoCall';


interface IProps extends InputProps<ValidateValueType> {
}
export const AddValidationButton: React.FC<IProps> = React.memo((props) => {
    const { value = {}, setValue } = props;

    const addDataType = useMemoCall((type: ValidateDataTypesEnums) => {
        setValue({
            type: type,
            entities: []
        })
    });
    return <>
        {
            // <DataTypeView value={value} onChange={onChange} />
            value.type ? <DataTypeView {...props} /> :
                <AddValidationsList entityTypes={validateDataTypes} onChange={addDataType} />
        }
    </>
})